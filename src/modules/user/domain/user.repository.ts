import User from "./user";

export interface UserRepository<T> {
	list(): Promise<User[]>
	listOne(guid: string): Promise<User>
	insert(user:User): Promise<User>
	update(user:User): Promise<User>
	delete(guid: string): Promise<User>
}
