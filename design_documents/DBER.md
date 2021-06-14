``` plantuml
@startuml
class t_users
class t_login_histories
class t_sessions
t_users --> t_sessions
t_login_histories --> t_sessions
@enduml
```