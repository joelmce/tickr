import prisma from "@/prisma/prismaClient";

export async function shareDashboard(layout, ownerId) {
  await prisma.dashboard.create({
    data: {
      layout: layout,
      user: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
}
