import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, zoneId, game } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID diperlukan" }, { status: 400 });
    }

    // Simulasi respons nickname berdasarkan game
    let nickname = "User_Abipay_Player";
    if (game === "mlbb") nickname = `Pro_Gamer_${userId.slice(-3)}`;
    if (game === "ff") nickname = `FF_Master_${userId.slice(-3)}`;

    return NextResponse.json({
      success: true,
      data: {
        userId,
        zoneId: zoneId || "",
        nickname: nickname,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}