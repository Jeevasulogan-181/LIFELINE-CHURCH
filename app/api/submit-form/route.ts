import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { formType, ...data } = body

    if (!formType || !["contact", "prayer"].includes(formType)) {
      return NextResponse.json(
        { error: "Invalid form type" },
        { status: 400 }
      )
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL

    if (!scriptUrl) {
      // If no Google Script URL is configured, log and return success
      // This allows the forms to work in development without the integration
      console.log(`[Form Submission - ${formType}]`, data)
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (no Google Sheets integration configured)",
      })
    }

    // Send data to Google Apps Script web app
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType,
        timestamp: new Date().toISOString(),
        ...data,
      }),
    })

    if (!response.ok) {
      throw new Error(`Google Script responded with status ${response.status}`)
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    )
  }
}
