import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { role } = request.user;

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/", // todas as rotas podem ler esse cookie
      secure: true, // encriptografa com o https
      sameSite: true, // so pode ser acessado no mesmo dominio
      httpOnly: true, // so pode ser acessado pelo backend
    })
    .status(200)
    .send({
      token,
    });
}
