## `Versionning`

- v1.0: 
    - Project can be used as a sandbox logger
    - Data are not stored after the refresh of the project
    - tests can be performed

- v.1.1:
    - Data are stored and saved
    - Data are still available after project refresh
    - roles (Admin, User) added in the database, in order to add more security constraint
    - all data are typed

- v1.2:
    - findUser route is added, in order to display connected user's information

- vX, features to be added on next versions, thus, you can take this as a toDo list:
    - creating a test environment and database in order to not have our test impacting the development database
        - expected files to be impacted: mock-users.ts, sequelizeMock.ts, testsRoutes.test.ts
