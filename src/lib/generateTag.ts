import path from 'path';

import { ArgValues } from './args';
import getHash from './getHash';

interface PackageInfo {
  name: string;
  version: string;
  'docker-repository'?: string;
  'docker-repo'?: string;
}

const getRepoName = (argv: ArgValues, packageInfo: PackageInfo) => {
  if (argv.repo) {
    return argv.repo;
  }

  const dockerRepo = packageInfo['docker-repository'] || packageInfo['docker-repo'];
  if (dockerRepo) {
    return dockerRepo;
  }

  if (packageInfo.name.substring(0, 1) === '@') {
    return packageInfo.name.split('/')[0].substring(1);
  }

  return false;
};

const getPackageName = (argv: ArgValues, packageInfo: PackageInfo) => {
  if (argv.package) {
    return argv.package;
  }

  if (packageInfo.name.substring(0, 1) === '@') {
    return packageInfo.name.split('/').pop();
  }

  return packageInfo.name;
};

const validateTag = (tag: string) => {
  if (!tag) {
    throw new Error('No tag or repo name received');
  }

  if (!tag.match(/^[\w\-_]+$/)) {
    throw new Error(
      'Only alphanumeric characters, dashes and underscores are'
      + ` allowed in a tag/repo name. Got ${tag}`,
    );
  }

  return true;
};

const loadPackageInfo = (cwd: string) => {
  try {
    return require(
      path.resolve(cwd, 'package.json'),
    );
  } catch (e) {
    throw new Error(`Cannot read package.json in ${cwd}`);
  }
};

const generateTag = async (argv: ArgValues, cwd: string, overwritePackageInfo?: PackageInfo) => {
  const packageInfo: PackageInfo = overwritePackageInfo || loadPackageInfo(cwd);
  const repoName = getRepoName(argv, packageInfo);
  if (!repoName) {
    throw new Error(
      'No docker repository name found.\n'
      + 'Either use a package scope name or set the docker-repository in your package.json file',
    );
  }
  validateTag(repoName);

  const packageName = getPackageName(argv, packageInfo);
  if (!packageName) {
    throw new Error(
      'No package name found. Invalid package.json?',
    );
  }
  validateTag(packageName);

  let tagName: string = '';
  if (argv.tag) {
    validateTag(argv.tag);
    tagName = argv.tag;
  }
  else if (argv.hash) {
    tagName = await getHash();
    tagName = (argv['tag-prefix'] || '') + tagName;
    validateTag(tagName);
  }
  else if (packageInfo.version) {
    tagName = (argv['tag-prefix'] || '') + packageInfo.version;
  }

  if (!tagName) {
    throw new Error(
      'No tag name could be generated, because there is no version being set'
      + ' in your package.json',
    );
  }

  return `${repoName}/${packageName}:${tagName}`;
};

export default generateTag;
