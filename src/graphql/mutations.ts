import { gql } from "@apollo/client";

export const AUTHORIZE = gql`
  mutation authorize($email: String!, $password: String!) {
    authorize(credentials: { email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        ... on User {
          id
          email
          researchPermission
          notificationsAllowed
          notificationsStart
          notificationsEnd
          fa
          googleFa
          authenticationSecret
          status
          defaultLocation
          gender
          yearOfBirth
          verified
          education
          backgroundFilled
          backgroundFilledTime
          backgroundCount
          maxStreak
          currentStreak
          dynamicStreak
          versionNumber
          versionNumberTime
          lastForm
          studies {
            count
            studyId {
              id
              name
              description
              start
              end
            }
          }
          tagCollection {
            location {
              title
              frequency
              type
            }
            mainActivity {
              title
              frequency
              type
            }
            sideActivity {
              title
              frequency
              type
            }
            social {
              title
              frequency
              type
            }
            tool {
              title
              frequency
              type
            }
            framework {
              title
              frequency
              type
            }
            language {
              title
              frequency
              type
            }
            method {
              title
              frequency
              type
            }
          }
        }
      }
    }
  }
`;

export const CREATE_RESEARCHER = gql`
  mutation CreateResearcher($researcher: CreateResearcherInput) {
    createResearcher(researcher: $researcher) {
      id
    }
  }
`;

export const CREATE_RESEARCHER_GROUP = gql`
  mutation CreateResearcherGroup($group: CreateResearcherGroupInput) {
    createResearcherGroup(group: $group) {
      id
      name
    }
  }
`;

export const CREATE_STUDY = gql`
  mutation CreateStudy($study: CreateStudyInput) {
    createStudy(study: $study) {
      id
      name
    }
  }
`;

export const REMOVE_STUDY_PERMISSION = gql`
  mutation RemoveStudyPermission($groupId: ID!, $studyId: ID!) {
    removeStudyPermission(groupId: $groupId, studyId: $studyId)
  }
`;

export const ADD_STUDY_PERMISSION = gql`
  mutation AddStudyPermission($groupId: ID!, $studyId: ID!) {
    addStudyPermission(groupId: $groupId, studyId: $studyId)
  }
`;

export const ADD_USERS_TO_STUDY = gql`
  mutation AddUserstoStudy($studyId: ID!, $users: [String!]!) {
    addUsersToStudy(studyId: $studyId, users: $users)
  }
`;

export const REMOVE_USERS_FROM_STUDY = gql`
  mutation RemoveUsersFromStudy($studyId: ID!, $users: [String!]!) {
    removeUsersFromStudy(studyId: $studyId, users: $users)
  }
`;

export const DELETE_STUDY = gql`
  mutation DeleteStudy($studyId: ID!) {
    deleteStudy(studyId: $studyId)
  }
`;

export const DELETE_RESEARCHER_GROUP = gql`
  mutation DeleteResearcherGroup($groupId: ID!) {
    deleteResearcherGroup(groupId: $groupId)
  }
`;

export const DELETE_RESEARCHER = gql`
  mutation DeleteResearcher($id: ID!) {
    deleteResearcher(id: $id)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const DELETE_FORM = gql`
  mutation DeleteForm($id: ID!) {
    deleteForm(id: $id)
  }
`;

export const UPDATE_STUDY = gql`
  mutation UpdateStudy($studyId: ID!, $data: UpdateStudyInput) {
    updateStudy(studyId: $studyId, data: $data)
  }
`;

export const TOGGLE_SPECIFIED_USERS = gql`
  mutation ToggleSpecifiedUsers($studyId: ID!) {
    toggleSpecifiedUsers(studyId: $studyId)
  }
`;

export const TOGGLE_OPEN_STUDY = gql`
  mutation ToggleOpenStudy($studyId: ID!) {
    toggleOpenStudy(studyId: $studyId)
  }
`;

export const TOGGLE_SPECIFIED_USERS_AND_OPEN_STUDY = gql`
  mutation ToggleOpenStudy($studyId: ID!) {
    toggleOpenStudy(studyId: $studyId)
    toggleSpecifiedUsers(studyId: $studyId)
  }
`;

export const UPDATE_RESEARCHER_GROUP = gql`
  mutation UpdateResearcherGroup($groupId: ID!, $name: String) {
    updateResearcherGroup(groupId: $groupId, name: $name)
  }
`;

export const UPDATE_RESEARCHER = gql`
  mutation UpdateResearcher($id: ID!, $data: UpdateResearcherInput) {
    updateResearcher(id: $id, data: $data)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput) {
    updateUser(id: $id, data: $data)
  }
`;

export const ADD_RESEARCHERS_TO_GROUP = gql`
  mutation AddResearchersToGroup($groupId: ID!, $researchers: [String!]!) {
    addResearchersToGroup(groupId: $groupId, researchers: $researchers)
  }
`;

export const REMOVE_RESEARCHERS_FROM_GROUP = gql`
  mutation RemoveResearchersFromGroup($groupId: ID!, $researchers: [String!]!) {
    removeResearchersFromGroup(groupId: $groupId, researchers: $researchers)
  }
`;

export const CREATE_2FA_EMAIL_WEB = gql`
  mutation create2FaEmailWeb($email: String!) {
    create2FaEmailWeb(email: $email)
  }
`;

export const CREATE_GOOGLE_EMAIL = gql`
  mutation CreateGoogleEmail($email: String!, $authenticationSecret: String!) {
    createGoogleEmail(
      email: $email
      authenticationSecret: $authenticationSecret
    )
  }
`;

export const VERIFY_2FA_EMAIL_WEB = gql`
  mutation Verify2FaEmailWeb($email: String!, $token: Int) {
    verify2FaEmailWeb(email: $email, token: $token) {
      user {
        ... on Researcher {
          email
        }
      }
    }
  }
`;

export const VERIFY_GOOGLE_AUTHENTICATOR = gql`
  mutation VerifyGoogleAuthenticator($secret: String!, $token: String) {
    verifyGoogleAuthenticator(secret: $secret, token: $token)
  }
`;

export const SEND_COLLECTION_NOTIFICATION = gql`
  mutation SendCollectionNotification(
    $message: String!
    $typeId: Int
    $studyId: ID!
  ) {
    sendCollectionNotification(
      notification: { message: $message, typeId: $typeId, studyId: $studyId }
    )
  }
`;

export const SEND_STUDY_INVITATION = gql`
  mutation SendStudyInvitation($invitation: CreateInvitationInput) {
    createInvitation(invitation: $invitation)
  }
`;

export const DELETE_MANY_FORMS = gql`
  mutation DeleteManyForms($ids: [ID!]) {
    deleteManyForms(ids: $ids)
  }
`;

export const DELETE_MANY_USERS = gql`
  mutation DeleteManyUsers($ids: [ID!]) {
    deleteManyUsers(ids: $ids)
  }
`;

export const DELETE_MANY_STUDIES = gql`
  mutation DeleteManyStudies($ids: [ID!]) {
    deleteManyStudies(ids: $ids)
  }
`;

export const DELETE_MANY_RESEARCHERS = gql`
  mutation DeleteManyResearchers($ids: [ID!]) {
    deleteManyResearchers(ids: $ids)
  }
`;

export const DELETE_MANY_RESEARCHER_GROUPS = gql`
  mutation DeleteManyResearcherGroups($ids: [ID!]) {
    deleteManyResearcherGroups(ids: $ids)
  }
`;

export const MARK_AS_EXPORTED = gql`
  mutation MarkAsExported($formIds: [ID!]!) {
    markAsExported(formIds: $formIds)
  }
`;

export const ADD_SCHEDULED_NOTIFICATION = gql`
  mutation AddScheduledNotification(
    $studyId: ID!
    $notification: ScheduledNotificationInput
  ) {
    addScheduledNotification(studyId: $studyId, notification: $notification)
  }
`;

export const REMOVE_SCHEDULED_NOTIFICATION = gql`
  mutation RemoveScheduledNotification($studyId: ID!, $notificationId: ID!) {
    removeScheduledNotification(
      studyId: $studyId
      notificationId: $notificationId
    )
  }
`;

export const CREATE_INVITATION_EMAIL = gql`
  mutation createInvitationEmail($id: ID!) {
    createInvitationEmail(id: $id)
  }
`;

export const VERIFY_RESEARCHER = gql`
  mutation verifyResearcher($researcherId: ID!, $token: Int) {
    verifyResearcher(researcherId: $researcherId, token: $token)
  }
`;

export const CREATE_EMAIL_CHANGE_VERIFICATION_EMAIL = gql`
  mutation CreateEmailChangeVerification($id: ID!, $newEmail: String!) {
    createEmailChangeVerification(id: $id, newEmail: $newEmail)
  }
`;

export const CREATE_SURVEY = gql`
  mutation CreateSurvey($survey: CreateSurveyInput) {
    createSurvey(survey: $survey) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;

export const UPDATE_SURVEY = gql`
  mutation UpdateSurvey($survey: UpdateSurveyInput) {
    updateSurvey(survey: $survey) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;

export const DELETE_SURVEY = gql`
  mutation DeleteSurvey($id: ID!) {
    deleteSurvey(id: $id) {
      id
    }
  }
`;

export const CREATE_PAGE = gql`
  mutation CreatePage($input: CreatePageInput) {
    createPage(input: $input) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation UpdatePage($input: UpdatePageInput) {
    updatePage(input: $input) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation DeletePage($input: DeletePageInput) {
    deletePage(input: $input) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion($input: AddQuestionInput) {
    addQuestion(input: $input) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($input: UpdateQuestionInput) {
    updateQuestion(input: $input) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($input: DeleteQuestionInput) {
    deleteQuestion(input: $input) {
      id
      name
      description
      pages {
        index
        header
        questions {
          questionId
          description
          scaleLabels
          scaleRange
          scaleStep
        }
      }
      createdAt
    }
  }
`;
