+---------------+ +---------------+ +---------------+
| User | | Teacher | | Student |
+---------------+ +---------------+ +---------------+
| PK: id |1-----1| PK: id |1-----_| PK: id |
| email | | name | | name |
| password | | gender | | gender |
| role | | address | | address |
| studentId (FK)| | birthday | | birthday |
| teacherId (FK)| | fax | | className |
| companyId (FK)| | phoneNumber | | phoneNumber |
+---------------+ | avatarPath | | avatarPath |
+---------------+ | teacherId (FK)|
+---------------+
| 1
|
| 1
+---------------+ +---------------+ +---------------+
| Company | | Job | | StudentReport |
+---------------+ +---------------+ +---------------+
| PK: id |1-----_| PK: id |1-----1| PK: id |
| name | | title | | attachmentPath|
| address | | content | | status |
| phoneNumber | | coverPath | | score |
| description | | from | | comment |
| type | | to | | jobId (FK) |
| domain | | companyId (FK)| +---------------+
| website | +---------------+
| logoPath |  
+---------------+

+---------------+ +---------------+ +---------------+
| Class | | Subject | | Semester |
+---------------+ +---------------+ +---------------+
| PK: id | | PK: id |_-----_| PK: id |
| classNo |_-----1| subjectNo | | year |
| room | | subjectCategory| | period |
| from | | name | | majorId (FK) |
| to | | englishName | +---------------+
| duration | | numberOfCredits| |
| subjectId (FK)| +---------------+ |
| teacherId (FK)| | _ |
+---------------+ | |
| | _ |
| _ | |
| v |
| +---------------+ |
| | SubjectTeachers| |
| +---------------+ |
| | PK: subjectId | |
| | PK: teacherId | |
| +---------------+ |
| |
| _ |
| |
| +---------------+ |
| | SemesterEvent | |
+------_+---------------+ |
| PK: id | |
| from | |
| to | |
| title | |
| userId (FK) | |
+---------------+ |
|
+---------------+ +---------------+ |
| CalendarEvent | | Major | |
+---------------+ +---------------+ |
| PK: id | | PK: id |1-----------+
| from | | majorNo |
| to | | name |
| title | | englishName |
| content | | degreeName |
| userId (FK) | | knowledge |
+---------------+ | attitude |
| skills |
| careerPath |
| higherEducation|
+---------------+
