/**
 * Copyright 2018-present MongoDB, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import MongoNamespace from "./MongoNamespace";
import { OperationType } from "./OperationType";
import UpdateDescription from "./UpdateDescription";

/**
 * Represents a change event communicated via a MongoDB change stream. This 
 * type of stream always includes a fullDocument for update events, and also 
 * includes the change event ID and namespace of the event as returned by 
 * MongoDB.
 * 
 * @type T The underlying type of documents on the collection for which this 
 *         change event was produced.
 */
export default interface ChangeEvent<T> {
  readonly id: object;
  readonly operationType: OperationType;
  readonly fullDocument?: T;
  readonly namespace: MongoNamespace;
  readonly documentKey: object;
  readonly updateDescription?: UpdateDescription;
}
