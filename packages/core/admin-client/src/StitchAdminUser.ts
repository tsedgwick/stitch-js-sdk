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

import {
  CoreStitchUser,
  StitchUserFactory,
  StitchUserIdentity,
  StitchUserProfile,
  StitchUserProfileImpl
} from "mongodb-stitch-core-sdk";

class StitchAdminUser implements CoreStitchUser {
  /**
   * The String representation of the id of this Stitch user.
   */
  public readonly id: string;

  /**
   * A string describing the type of authentication provider used to log in as this user.
   */
  public readonly loggedInProviderType: string;

  /**
   * The name of the authentication provider used to log in as this user.
   */
  public readonly loggedInProviderName: string;

  /**
   * Whether or not this user is logged in.
   * 
   * @note This is not a dynamic property, this is the state of whether or not 
   *       the user was logged in at the time this user object was created.
   */
  public readonly isLoggedIn: boolean;

  /**
   * The time of the last auth event involving this user. 
   * This includes login, logout, and active user changed.
   */
  public readonly lastAuthActivity: Date;

  /**
   * A string describing the type of this user. (Either `server` or `normal`)
   */
  public get userType(): string {
    return this.profile.userType!;
  }

  /**
   * A `StitchCore.StitchUserProfile` object describing this user.
   */
  public readonly profile: StitchUserProfileImpl;

  public readonly customData: { [key: string] : any };

  /**
   * An array of `StitchCore.StitchUserIdentity` objects representing the identities linked
   * to this user which can be used to log in as this user.
   */
  public get identities(): StitchUserIdentity[] {
    return this.profile.identities;
  }

  /**
   * Initializes this user with its basic properties.
   */
  public constructor(
    id: string,
    providerType: string,
    providerName: string,
    isLoggedIn: boolean,
    lastAuthActivity: Date,
    userProfile: StitchUserProfileImpl,
    customData?: { [key: string] : any }
  ) {
    this.id = id;
    this.loggedInProviderType = providerType;
    this.loggedInProviderName = providerName;
    this.isLoggedIn = isLoggedIn;
    this.lastAuthActivity = lastAuthActivity;
    this.profile = userProfile;
    this.customData = customData === undefined ? {} : customData;
  }
}

class StitchAdminUserFactory implements StitchUserFactory<StitchAdminUser> {
  /**
   * The factory function which can produce a `StitchAdminUser` with the provided id, logged in provider type/name,
   * and a user profile.
   */
  public makeUser(
    id: string,
    loggedInProviderType: string,
    loggedInProviderName: string,
    isLoggedIn: boolean,
    lastAuthActivity: Date,
    userProfile?: StitchUserProfileImpl,
    customData?: { [key: string] : any }
  ): StitchAdminUser {
    return new StitchAdminUser(
      id,
      loggedInProviderType,
      loggedInProviderName,
      isLoggedIn,
      lastAuthActivity,
      userProfile!,
      customData
    );
  }
}

export { StitchAdminUser, StitchAdminUserFactory };
