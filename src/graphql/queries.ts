import { gql } from "@apollo/client";

export const PING = gql`
  query ping {
    ping
  }
`;

export const STUDY_FORMS = gql`
  query StudyForms(
    $studyId: ID!
    $items: [StudyItemInput!]
    $start: DateTime
    $end: DateTime
    $amount: Int
  ) {
    studyForms(
      studyId: $studyId
      items: $items
      start: $start
      end: $end
      amount: $amount
    ) {
      id
      typeId
      answers {
        id
        type
        description
        value
      }
      answeredBy {
        id
        email
        status
      }
      createdAt
      exportedAt
    }
  }
`;

export const GET_FORM = gql`
  query Form($id: ID!) {
    form(id: $id) {
      id
      typeId
      answers {
        id
        type
        description
        value
      }
      answeredBy {
        id
        email
        status
      }
      createdAt
    }
  }
`;

export const GET_FORMS = gql`
  query Forms(
    $searchKeyword: String
    $answeredBy: ID
    $amount: Int
    $researchPermission: Boolean
    $typeId: Int
  ) {
    forms(
      searchKeyword: $searchKeyword
      answeredBy: $answeredBy
      amount: $amount
      researchPermission: $researchPermission
      typeId: $typeId
    ) {
      id
      typeId
      answers {
        id
        type
        description
        value
      }
      answeredBy {
        id
        email
        status
      }
      createdAt
    }
  }
`;

export const GET_RESEARCHER_GROUP = gql`
  query ResearcherGroup($groupId: ID!) {
    researcherGroup(id: $groupId) {
      id
      name
      permissions {
        id
        name
        instruments
        start
        end
      }
      researchers {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_STUDY = gql`
  query Study($studyId: ID) {
    study(studyId: $studyId) {
      name
      description
      id
      items {
        placement
        isShownFirstTime
        type
        typeId
      }
      endItems {
        placement
        isShownFirstTime
        type
        typeId
      }
      end
      start
      specifiedUsers
      openStudy
      permissions {
        id
        name
      }
      selectedUsers {
        id
        email
        status
        researchPermission
      }
      enrolledUsers {
        id
        email
        status
        researchPermission
      }
      scheduledNotifications {
        id
        duration
        frequency
        weekdays
        message
        items {
          placement
          isShownFirstTime
          type
          typeId
        }
        startTime
        endTime
      }
    }
  }
`;

export const GET_RESEARCHER = gql`
  query Researcher($id: ID, $email: String) {
    researcher(id: $id, email: $email) {
      id
      email
      createdAt
      updatedAt
      role
      verified
      researcherGroups {
        id
        name
      }
    }
  }
`;

export const GET_RESEARCHER_EMAIL = gql`
  query Researcher($id: ID) {
    researcher(id: $id) {
      id
      email
    }
  }
`;

export const RESEARCHER_GROUPS = gql`
  query ResearcherGroups($searchKeyword: String) {
    researcherGroups(searchKeyword: $searchKeyword) {
      id
      name
      researchers {
        id
        email
      }
      permissions {
        id
        name
        createdAt
      }
      createdAt
    }
  }
`;

export const RESEARCHERS = gql`
  query Researchers($searchKeyword: String) {
    researchers(searchKeyword: $searchKeyword) {
      id
      email
      role
      createdAt
      updatedAt
      verified
      researcherGroups {
        id
      }
    }
  }
`;

export const STUDIES = gql`
  query Studies($searchKeyword: String) {
    studies(searchKeyword: $searchKeyword) {
      id
      name
      description
      start
      end
      specifiedUsers
      permissions {
        id
        name
      }
      items {
        id
        placement
        isShownFirstTime
        type
        typeId
      }
      endItems {
        placement
        isShownFirstTime
        type
        typeId
      }
    }
  }
`;
// enrolledUsers {
//   id
// }
// scheduledNotifications {
//   id
//   duration
//   frequency
//   weekdays
//   message
//   items {
//     placement
//     isShownFirstTime
//     type
//     typeId
//   }
//   startTime
//   endTime
// }

export const USERS = gql`
  query Users($searchKeyword: String) {
    users(searchKeyword: $searchKeyword) {
      id
      email
      role
      status
      verified
      createdAt
      updatedAt
      notificationsAllowed
      notificationsStart
      notificationsEnd
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID, $email: String) {
    user(id: $id, email: $email) {
      id
      email
      role
      status
      verified
      createdAt
      updatedAt
      notificationsAllowed
      notificationsStart
      notificationsEnd
      researchPermission
      studies {
        id
        name
      }
    }
  }
`;

export const GET_VERIFICATION_STATUS = gql`
  query VerificationStatus($email: String!, $id: ID) {
    verificationStatus(email: $email, id: $id) {
      id
      verified
      email
    }
  }
`;

export const CHECK_TOKEN = gql`
  query CheckToken($userId: ID!, $token: Int) {
    checkToken(id: $userId, token: $token)
  }
`;

export const GET_SURVEYS = gql`
  query Surveys {
    surveys {
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
    }
  }
`;

export const GET_SURVEY = gql`
  query Survey($id: ID!) {
    survey(id: $id) {
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
    }
  }
`;
