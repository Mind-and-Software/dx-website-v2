import { type ApolloClient } from "@apollo/client";
import { AUTHORIZE } from "../../graphql/mutations";
import { AuthData } from "@/AuthContext/AuthContext";

const signIn = async (
  email: string,
  password: string,
  apolloClient: ApolloClient<any>,
): Promise<AuthData | undefined> => {
  const { data, errors } = await apolloClient.mutate({
    mutation: AUTHORIZE,
    variables: {
      email,
      password,
    },
  });

  if (errors) {
    return undefined;
  }

  const result = {
    token: data.authorize.accessToken,
    refreshToken: data.authorize.refreshToken,
    id: data.authorize.user.id,
    email,
    createdAt: data.authorize.user.createdAt,
    verified: data.authorize.user.verified,
    authenticationSecret: data.authorize.user.authenticationSecret,
    faActivated: data.authorize.user.faActivated,
    researchPermission: data.authorize.user.researchPermission,
    locationPermission: data.authorize.user.locationPermission,
    notificationsAllowed: data.authorize.user.notificationsAllowed,
    notificationsStart: data.authorize.user.notificationsStart,
    notificationsEnd: data.authorize.user.notificationsEnd,
    status: data.authorize.user.status,
    backgroundFilled: data.authorize.user.backgroundFilled,
    backgroundFilledTime: data.authorize.user.backgroundFilledTime,
    backgroundCount: data.authorize.user.backgroundCount,
    tagCollection: data.authorize.user.tagCollection,
    FA: data.authorize.user.FA,
  };

  return result;
};

export const authService = {
  signIn,
};
