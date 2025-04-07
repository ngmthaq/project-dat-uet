# https://mermaid.js.org/

erDiagram
USER {
int id PK
datetime createdAt
datetime updatedAt
datetime deletedAt
varchar password
varchar email UK
enum role
int studentId FK
int teacherId FK
int companyId FK
}

    STUDENT {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        int teacherId FK
        varchar name
        enum gender
        varchar address
        datetime birthday
        varchar className
        varchar phoneNumber
        varchar avatarPath
        int studentReportId FK
    }

    TEACHER {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar name
        enum gender
        varchar address
        datetime birthday
        varchar fax
        varchar phoneNumber
        varchar avatarPath
    }

    COMPANY {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar name
        varchar address
        varchar phoneNumber
        text description
        enum type
        varchar domain
        varchar website
        varchar logoPath
    }

    STUDENT_REPORT {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar attachmentPath
        enum status
        varchar score
        varchar comment
        int jobId FK
    }

    STUDENT_CV {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar cvPath
        int studentId FK
    }

    JOB {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar title
        varchar content
        varchar coverPath
        datetime from
        datetime to
        int companyId FK
    }

    CALENDAR_EVENT {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        date from
        date to
        text title
        text content
        int userId FK
    }

    SUBJECT {
        int id PK
        varchar subjectNo
        enum subjectCategory
        varchar name
        varchar englishName
        int numberOfCredits
    }

    CLASS_ENTITY {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar classNo
        varchar room
        date from
        date to
        int duration
        int subjectId FK
        int teacherId FK
    }

    MAJOR {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar majorNo
        varchar name
        varchar englishName
        varchar degreeName
        text knowledge
        text attitude
        text skills
        text careerPath
        text higherEducation
    }

    SEMESTER {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        varchar year
        varchar period
        int majorId FK
    }

    SEMESTER_EVENT {
        int id PK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
        date from
        date to
        text title
        int userId FK
    }

    USER ||--o{ CALENDAR_EVENT : creates
    USER ||--o{ SEMESTER_EVENT : creates
    USER ||--o| STUDENT : "is a"
    USER ||--o| TEACHER : "is a"
    USER ||--o| COMPANY : "is a"

    TEACHER ||--o{ STUDENT : advises
    TEACHER ||--o{ CLASS_ENTITY : teaches

    STUDENT ||--o{ STUDENT_CV : has
    STUDENT ||--|| STUDENT_REPORT : has

    STUDENT_REPORT }o--|| JOB : "is for"

    COMPANY ||--o{ JOB : posts

    SUBJECT ||--o{ CLASS_ENTITY : "has instances"

    CLASS_ENTITY }o--o{ SEMESTER_EVENT : "associated with"

    MAJOR ||--o{ SEMESTER : offers

    SUBJECT }o--o{ SEMESTER : "offered in"
    SUBJECT }o--o{ TEACHER : "can be taught by"
