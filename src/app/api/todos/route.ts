import { getUseServerSession } from "@/auth/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string } from "yup";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = searchParams.get("take") ?? "10";
    const skip = searchParams.get("skip") ?? "0";
    if (isNaN(+take))
        return NextResponse.json(
            { message: "Take tiene que ser un número" },
            { status: 400 }
        );
    if (isNaN(+skip))
        return NextResponse.json(
            { message: "Skip tiene que ser un número" },
            { status: 400 }
        );

    const todos = await prisma.todo.findMany({
        take: +take,
        skip: +skip,
    });

    // Paginación agregar lo siguiente dentro del findMany
    //   {
    //     skip: 1,
    //     take: 4,
    // }
    return NextResponse.json(todos);
}

const postSchema = object({
    description: string().required(),
    complete: boolean().optional().default(false),
});

export async function POST(request: Request) {
    const user = await getUseServerSession();

    if (!user) return NextResponse.json("No autorizado", { status: 401 });

    try {
        const { description, complete } = await postSchema.validate(
            await request.json()
        );
        const todo = await prisma.todo.create({
            data: { description, complete, userId: user.id },
        });
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    const user = await getUseServerSession();

    if (!user) return NextResponse.json("No autorizado", { status: 401 });

    const deleteTodo = await prisma.todo.deleteMany({
        where: { complete: true, userId: user.id },
    });

    return NextResponse.json(deleteTodo);
}
