export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
}
