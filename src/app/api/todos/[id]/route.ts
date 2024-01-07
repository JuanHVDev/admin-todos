import { getUseServerSession } from "@/auth/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string } from "yup";
interface Segments {
    params: {
        id: string;
    };
}

const getTodo = async (id: string): Promise<Todo | null> => {
    const user = await getUseServerSession();

    if (!user) {
        return null;
    }

    const todo = await prisma.todo.findFirst({
        where: { id },
    });

    if (todo?.userId !== user.id) {
        return null;
    }
    return todo;
};

export async function GET(request: Request, { params }: Segments) {
    const { id } = params;
    const todo = await getTodo(id);
    return NextResponse.json(todo);
}

const putSchema = object({
    description: string().optional(),
    complete: boolean().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
    const { id } = params;
    const todo = await getTodo(id);

    if (!todo) {
        return NextResponse.json({ message: `Todo con el i: ${id} no existe` });
    }

    try {
        const { description, complete, ...rest } = await putSchema.validate(
            await req.json()
        );

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { description, complete },
        });

        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }

    //  return NextResponse.json({ { title :{ title } }, { status: 201 });
}
