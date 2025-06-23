import { type NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.",
          isConfigError: true,
        },
        { status: 500 },
      )
    }

    const systemMessage = {
      role: "system" as const,
      content: `You are an expert AI construction assistant specializing in:
      - Construction materials and their properties
      - Material quantity calculations and estimations
      - Construction project planning and scheduling
      - Supplier recommendations and material sourcing
      - Construction best practices and safety guidelines
      - Weather impact on construction activities
      - Cost estimation and budget planning
      - Building codes and regulations
      - Equipment and tool recommendations
      
      Provide practical, accurate, and helpful advice. Keep responses concise but informative. 
      When discussing quantities or calculations, always ask for project specifics if not provided.
      Prioritize safety in all recommendations.
      
      Format your responses in a friendly, professional manner suitable for construction professionals.`,
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    })

    const assistantMessage =
      completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."

    return NextResponse.json({ message: assistantMessage })
  } catch (error: any) {
    console.error("OpenAI API error:", error)

    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return NextResponse.json(
        {
          error: "Invalid OpenAI API key. Please check your API key configuration.",
          isConfigError: true,
        },
        { status: 401 },
      )
    }

    if (error?.status === 429) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again in a moment." }, { status: 429 })
    }

    if (error?.status === 403) {
      return NextResponse.json(
        {
          error: "API access forbidden. Please check your OpenAI account status and billing.",
          isConfigError: true,
        },
        { status: 403 },
      )
    }

    if (error?.code === "insufficient_quota") {
      return NextResponse.json(
        {
          error: "OpenAI quota exceeded. Please check your billing and usage limits.",
          isConfigError: true,
        },
        { status: 429 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to get AI response. Please try again later.",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
