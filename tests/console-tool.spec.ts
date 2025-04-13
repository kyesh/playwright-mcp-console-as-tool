/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { test, expect } from './fixtures';

test('browser_console tool', async ({ client }) => {
  await client.callTool({
    name: 'browser_navigate',
    arguments: {
      url: 'data:text/html,<html><script>console.log("Hello, world!");console.error("Error"); </script></html>',
    },
  });

  const result = await client.callTool({
    name: 'browser_console',
    arguments: {},
  });
  
  expect(result.content).toHaveLength(1);
  expect(result.content[0].type).toBe('text');
  expect(result.content[0].text).toBe('[LOG] Hello, world!\n[ERROR] Error');
});

test('browser_console tool with no messages', async ({ client }) => {
  await client.callTool({
    name: 'browser_navigate',
    arguments: {
      url: 'data:text/html,<html><body>No console messages</body></html>',
    },
  });

  const result = await client.callTool({
    name: 'browser_console',
    arguments: {},
  });
  
  expect(result.content).toHaveLength(1);
  expect(result.content[0].type).toBe('text');
  expect(result.content[0].text).toBe('No console messages');
});
