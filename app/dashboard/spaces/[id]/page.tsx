import { prisma } from "@/lib/prisma";
import CreateListButton from "@/components/projects/create-list-button";
import ProjectCard from "@/components/projects/project-card";

export default async function SpacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const space = await prisma.space.findUnique({
    where: {
      id,
    },
    include: {
      projects: {
        include: {
          tasks: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!space) {
    return (
      <div className="text-foreground">
        Space not found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            {space.name}
          </h1>

          <p className="mt-2 text-muted-foreground">
            Lists in this Space
          </p>
        </div>

        <CreateListButton
          spaceId={space.id}
        />
      </div>

      <div className="grid gap-4">
        {space.projects.map((project) => (
          <ProjectCard
            key={project.id}
            spaceId={space.id}
            project={{
              id: project.id,
              name: project.name,
              description: project.description,
              tasks: project.tasks,
            }}
          />
        ))}

        {space.projects.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-border
              p-10
              text-center
              text-muted-foreground
            "
          >
            No Lists Found
          </div>
        )}
      </div>
    </div>
  );
}