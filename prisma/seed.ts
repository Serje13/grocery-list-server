import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "sergeykravtsov13@gmail.com",
    hash: "somehash",
    hashedRt: "somehash",
    groseries: {
        create: [
            {
                title:"bread",
                status: true,
                priority: 1,
                changes: {
                    create:[
                        {
                            createdAt: new Date(),
                        },
                        {
                            createdAt: new Date(),
                        },
                        {
                            createdAt: new Date(),
                        }
                    ]
                }
            },
            {
                title:"sugar",
                status: true,
                priority: 2,
                changes: {
                    create:[
                        {
                            createdAt: new Date(),
                        },
                        
                    ]
                }
            },
            {
                title:"meat",
                status: true,
                priority: 3,
                changes: {
                    create:[
                        {
                            createdAt: new Date(),
                        },
                        
                    ]
                }
            }
        ]
    }
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });

    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });