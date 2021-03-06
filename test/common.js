/*!
 * Copyright (c) 2019, Braydon Fuller
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {resolve} = require('path');
const {tmpdir} = require('os');
const {randomBytes} = require('crypto');
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);

const datadir = resolve(__dirname, './data');

function testdir(name) {
  return `${tmpdir()}/gpk-test-${name}-${randomBytes(4).toString('hex')}`;
}

function testfile(name) {
  return `${tmpdir()}/gpk-test-${randomBytes(4).toString('hex')}-${name}`;
}

async function unpack(tar, dst) {
  const cmd = `tar xf ${tar} -C ${dst}`
  const {stdout, stderr} = await exec(cmd);
}

function envar(x) {
  if (!x)
    return false;

  return JSON.parse(x);
}

module.exports = {
  datadir,
  testdir,
  testfile,
  unpack,
  envar
}
