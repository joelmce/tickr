import prisma from "@/prisma/prismaClient";

export async function getDashboard(dashboardId) {
  const dashboard = await prisma.dashboard
    .findUnique({
      where: {
        id: dashboardId,
      },
      select: {
        layout: true,
        user: {
          select: {
            id: true,
            alias: true,
          },
        },
      },
    })
    .then((result) => {
      return result;
    });

  function dashboardLayout() {
    return dashboard;
  }

  return { dashboardLayout };
}
