import path from 'path';

import { ArgValues } from './args';
import getHash from './getHash';

interface PackageInfo {
  name: string;
  version: string;
  'docker-repository'?: string;
  'docker-repo'?: string;
}

const getRepoName = (packageInfo: PackageInfo) => {
  const dockerRepo = packageInfo['docker-repository'] || packageInfo['docker-repo'];
  if (dockerRepo) {
    return dockerRepo;
  }

  if (packageInfo.name.substring(0, 1) === '@') {
    return packageInfo.name.split('/')[0].substring(1);
  }

  return false;
};

const validateTag = (tag: string) => {
  if (!tag) {
    throw new Error('No tag or repo name received');
  }

  if (tag.match(/[\s\/]+/)) {
    throw new Error('No spaces nor slashes are allowed in a tag/repo name');
  }

  return true;
}

const generateTag = async (argv: ArgValues, cwd: string) => {
  let packageInfo: PackageInfo;
  try {
    packageInfo = require(
      path.resolve(cwd, 'package.json'),
    );
  } catch (e) {
    throw new Error(`Cannot read package.json in ${cwd}`);
  }

  const repoName = getRepoName(packageInfo);
  if (!repoName) {
    throw new Error(
      'No docker repository name found.\n'
      + 'Either use a package scope name or set the docker-repository in your package.json file',
    );
  }
  validateTag(repoName);

  let tagName: string = '';
  if (argv.tag) {
    validateTag(argv.tag);
    tagName = argv.tag;
  }
  else if (argv.hash) {
    tagName = await getHash();
    validateTag(tagName);
    tagName = (argv['hash-prefix'] || '') + tagName;
    validateTag(tagName);
  }

  return `${repoName}:${tagName}`;
};

export default generateTag;
