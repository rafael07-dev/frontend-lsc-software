export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    enabled: boolean,
    username: string,
    accountNonLocked: boolean,
    accountNonExpired: boolean,
    credentialsNonExpired: boolean,
    roles: string []
}