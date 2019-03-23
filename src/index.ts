#!/usr/bin/env node

import collectArguments from './lib/args/collectArguments';
import printHelp from './lib/args/printHelp';

(() => {
  const argv = collectArguments();

  if (argv.help) {
    printHelp();
    process.exit(1);
  }
})();

// git rev-parse --short HEAD
// import runCommand from './runCommand';

// import fs from 'fs';
// import path from 'path';
//
// const fs = require( 'fs' );
// const path = require( 'path' );
// const { spawn } = require( 'child_process' );
// const { argv } = require( 'yargs' );
// const kleur = require( 'kleur' );
//
// const DIST_FOLDER = 'build';
//
// const runCommand = ( command, args, cwd, quiet = false, exitOnFailure = true ) => {
  // return new Promise( ( resolve, reject ) => {
    // const cmd = spawn( command, args, {
      // cwd,
    // } );
//
    // const output = {
      // stdout: '',
      // stderr: '',
      // exitCode: null,
    // };
//
    // const printOutput = ( std ) => ( data ) => {
      // output[ std ] += data.toString();
//
      // if ( !quiet ) {
        // process[ std ].write( data );
      // }
    // };
//
    // cmd.stdout.on( 'data', printOutput( 'stdout' ) );
    // cmd.stderr.on( 'data', printOutput( 'stderr' ) );
    // cmd.on( 'close', ( code ) => {
      // output.exitCode = code;
//
      // if ( code && exitOnFailure ) {
        // console.error( kleur.red( 'ERROR! Command failed!' ) );
        // console.error( kleur.red( `${ command } ${ args.join( ' ' ) }` ) );
        // process.exit( 1 );
      // }
//
      // if ( code ) {
        // return reject( output );
      // }
//
      // return resolve( output );
    // } );
  // } );
// };
//
// const checkIfImageExists = async ( tag, cwd ) => {
  // const result = await runCommand( 'docker', [ 'images' ], cwd, true );
//
  // const tagTokens = tag.split( ':' );
  // const lines = result.stdout.split( '\n' ).splice( 1 );
//
  // for ( const line of lines ) {
    // if ( !line.trim() ) {
      // continue;
    // }
//
    // const lineTokens = line.split( /\s+/ );
//
    // if ( tagTokens[ 0 ] == lineTokens[ 0 ] && tagTokens[ 1 ] === lineTokens[ 1 ] ) {
      // console.error( kleur.red( `Tag ${ kleur.bold( tag ) } already exists` ) );
      // process.exit( 1 );
    // }
  // }
//
  // return false;
// };
//
// const getHash = async ( cwd ) => {
  // const result = await runCommand(
    // 'git',
    // [ 'rev-parse', '--verify', 'HEAD' ],
    // cwd,
    // true
  // );
//
  // const hash = result.stdout.trim();
//
  // if ( !hash ) {
    // throw new Error( 'No valid hash retrieved' );
  // }
//
  // return hash;
// };
//
// ( async () => {
  // const cwd = argv.d || process.cwd();
  // if ( !fs.existsSync( cwd ) ) {
    // console.error( `Directory ${ cwd } does not exist` );
    // process.exit( 1 );
  // }
//
  // const packageFile = path.resolve( cwd, 'package.json' );
  // const pkgInfo = require( packageFile );
//
  // const repoTokens = pkgInfo.name.split( '/' );
  // if ( repoTokens.length !== 2 || pkgInfo.name.substring( 0, 1 ) !== '@' ) {
    // console.error( 'Invalid package name. Should be @repo-user/package-name' );
    // process.exit( 1 );
  // }
//
  // const version = argv.hash
    // ? await getHash( cwd )
    // : pkgInfo.version;
//
  // const repoTag = pkgInfo.name.substring( 1 );
  // const fullTag = `${ repoTag }:${ version }`;
//
  // console.log( kleur.gray( 'Check if image exists...' ) );
  // await checkIfImageExists( fullTag, cwd );
//
  // console.log( kleur.gray( 'Building package...' ) );
  // await runCommand( 'yarn', [ 'run', 'build' ], cwd );
  // console.log( kleur.gray( 'Building docker image...' ) );
  // await runCommand(
    // 'docker',
    // [
      // DIST_FOLDER,
      // '-t', fullTag,
      // '.',
    // ],
    // cwd
  // );
//
  // if ( argv.push ) {
    // console.log( kleur.gray( 'Pushing docker image to hub...' ) );
    // await runCommand( 'docker', [ 'push', fullTag ], cwd );
  // }
//
  // console.log( kleur.green( 'done' ) );
// } )();
// // import minimist from 'minimist';
// import kleur from 'kleur';
//
// console.log(kleur.cyan('Hello world'));
