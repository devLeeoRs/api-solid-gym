import { expect, describe, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "src/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Register Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    usersRepository.create({
      name: "John doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    usersRepository.create({
      name: "John doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(
      sut.execute({
        email: "johndoe@example.com",
        password: "12346",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(
      sut.execute({
        email: "johndoe@example.com",
        password: "12346",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
