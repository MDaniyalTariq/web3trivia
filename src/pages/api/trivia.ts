// src/app/api/trivia/route.js
import connectDB from "@/lib/database/db_connect";

import {Trivia} from '@/lib/database/model/trivia';
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
        connectDB();
        

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category'); // Use request.nextUrl to get query params


        if (!category) {
            return new Response(JSON.stringify({ error: "Category parameter is required" }), { status: 400 });
        }

        const questions = await Trivia.aggregate([
            { $match: { Category: category } },
            { $sample: { size: 10 } }
        ]);

        const responseData = questions.map(q => ({
            question: q.Question,
            A: q.A,
            B: q.B,
            C: q.C,
            D: q.D,
            difficulty: q.Difficulty,
            answer: q.Answer
        }));

        return new Response(JSON.stringify(responseData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error}), { status: 500 });
    }
}

