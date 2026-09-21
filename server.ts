import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Emergency context knowledge base injected to the agent
const DISASTER_KNOWLEDGE_BASE = `
You are "NER-SHIELD Apna Mitr" (अपना मित्र), the official 24x7 AI Disaster Emergency & Landslide Assistance Agent for the National Disaster Management Authority (NDMA) and Geological Survey of India (GSI) operating in the North Eastern Region of India (Mizoram, Meghalaya, Sikkim, Assam, Nagaland, Arunachal Pradesh).

PRIMARY MISSION:
Protect human lives, provide immediate actionable safety guidance during slope instability or torrential rains, guide distressed citizens to relief shelters and helplines, assist field volunteers with incident verification, and provide real-time hazard status updates.

CURRENT SITUATIONAL TELEMETRY & ZONE RISK STATUS:
- Aizawl NH-54 Corridor (Mizoram): CRITICAL RED ALERT (Index 94/100). Pore pressure surge at 148 kPa, surface slip 38 mm. Slope failure imminent between Km 14+200 and Chite Veng. Pre-emptive evacuation ordered. NH-54 is BLOCKED by debris; emergency bypass via Armed Veng bypass.
- East Jaintia Hills (Meghalaya, Lumshnong Limestone Belt): HIGH ORANGE ALERT (Index 81/100). Heavy continuous precipitation (58 mm/h), tension cracks detected near coal rat-hole zones.
- Gangtok - Rangpo NH-10 (Sikkim, 9th Mile): HIGH ORANGE ALERT (Index 79/100). Debris flow warning. Heavy vehicles restricted.
- Dima Hasao (Assam, Jatinga Valley): MODERATE YELLOW ALERT (Index 54/100). Rail and road traffic under observation.
- Kohima bypass (Nagaland): MODERATE YELLOW ALERT (Index 46/100). Normal cautious transit.

ACTIVE EMERGENCY RELIEF SHELTERS (Aizawl & NER):
1. Aizawl Government Higher Secondary School Indoor Stadium, Ramhlun North (Capacity: 850, Occupancy: 420, Food/Medical/Water available).
2. Chite Veng Community Community Hall, Aizawl (Capacity: 400, Occupancy: 310, Medical triage staged).
3. Lumshnong Parish Hall & Relief Center, East Jaintia Hills (Capacity: 500, Occupancy: 180).
4. Rangpo Government Senior Secondary School Relief Camp, East Sikkim (Capacity: 600, Occupancy: 210).

STATUTORY EMERGENCY HELPLINES (24x7 TOLL-FREE):
- National Emergency Unified Number: 112
- District Emergency Operation Centre (DEOC): 1077 (Toll Free)
- State Disaster Management Authority (SDMA): 1070
- National Disaster Response Force (NDRF) Control Room: 011-24363260 / +91-9711077372
- BRO Project Pushpak Control Room (Road Clearance): 0389-2342442
- Aizawl Civil Hospital Emergency: 0389-2322318
- East Jaintia Hills DEOC: 03655-230230

LANDSLIDE WARNING SIGNS (CITIZEN ADVISORY):
- Sudden appearance or widening of ground cracks on slopes or paved roads.
- Doors or windows sticking or jamming; cracks developing in building foundations or walls.
- Leaning telephone poles, power lines, fences, or retaining walls.
- Springs, seeps, or saturated ground appearing in places that are typically dry.
- Water in local streams suddenly turning muddy or brown, or unexpected surges/drops in stream flow.
- Rumbling sound resembling a freight train or low aircraft overhead (indicates moving mass debris).

IMMEDIATE SURVIVAL INSTRUCTIONS:
- If indoors: If escape is impossible, curl into a tight ball and protect your head under heavy furniture or in an interior corner.
- If outside: Move quickly away from the path of debris or mudflow. Run to the nearest stable high ground or ridge—NEVER stay in gullies, ravines, or natural drainage paths.
- If driving: Watch for collapsed pavements, mud, and fallen rock. If road collapses, do NOT attempt to drive through water or mudflow. Abandon vehicle safely toward high ground.
- Never return to a landslide zone immediately after movement stops; secondary failures frequently occur after rainfall continues.

TONE AND STYLE:
- Calm, authoritative, compassionate, and precise.
- Format crucial instructions (evacuation steps, phone numbers, shelter locations) with clear bullet points and bold emphasis.
- Answer queries directly and concisely so users in emergency situations can read instructions quickly.
- Support multilingual responses: if the user asks in Hindi, Assamese, Bengali, or Mizo, reply in that language or bilingual format.
`;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "5mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "NER-SHIELD National Landslide Intelligence Portal",
      timestamp: new Date().toISOString(),
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
    });
  });

  // AI Agent Chat Endpoint
  app.post("/api/ai-agent/chat", async (req, res) => {
    try {
      const { message, history = [], userLocation, emergencyContext } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required" });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback intelligent responder based on keyword matching and knowledge base
        const lower = message.toLowerCase();
        let fallbackResponse = "";

        if (lower.includes("shelter") || lower.includes("camp") || lower.includes("relief") || lower.includes("stay")) {
          fallbackResponse = `**Active Emergency Relief Shelters (NER-SHIELD Verified):**\n\n` +
            `1. **Aizawl Govt Higher Secondary Stadium (Ramhlun North)**\n   • Capacity: 850 (Occupancy: 420)\n   • Facilities: Drinking Water, Medical Triage, Emergency Rations, Blankets\n   • Contact DEOC: **1077**\n\n` +
            `2. **Chite Veng Community Hall (Aizawl)**\n   • Capacity: 400 (Occupancy: 310)\n   • Medical Squad & Quick Response deployed\n\n` +
            `3. **Lumshnong Parish Hall (East Jaintia Hills, Meghalaya)**\n   • Capacity: 500 (Occupancy: 180)\n\n` +
            `4. **Rangpo Senior Secondary Camp (East Sikkim)**\n   • Capacity: 600 (Occupancy: 210)\n\n` +
            `*Need immediate transport or evacuation assistance? Dial **112** or Aizawl DEOC at **1077**.*`;
        } else if (lower.includes("helpline") || lower.includes("contact") || lower.includes("number") || lower.includes("phone") || lower.includes("call")) {
          fallbackResponse = `**24x7 Official Emergency Helplines (Statutory NDMA/SDMA):**\n\n` +
            `• **112** — National Unified Emergency Number (Police, Fire, Ambulance)\n` +
            `• **1077** — District Emergency Operation Centre (DEOC) Toll-Free\n` +
            `• **1070** — State Disaster Management Authority (SDMA) Control Room\n` +
            `• **+91-9711077372** — NDRF 1st Battalion Rapid Response Team\n` +
            `• **0389-2342442** — Border Roads Organisation (BRO) Pushpak Clearing\n` +
            `• **0389-2322318** — Aizawl Civil Hospital Emergency Triage\n\n` +
            `*For deaf or speech-impaired citizens, SMS alerts are enabled via 112 mobile service.*`;
        } else if (lower.includes("nh-54") || lower.includes("nh54") || lower.includes("road") || lower.includes("highway") || lower.includes("travel") || lower.includes("aizawl")) {
          fallbackResponse = `**CRITICAL HIGHWAY ALERT — NH-54 (Aizawl Corridor):**\n\n` +
            `⚠️ **STATUS: BLOCKED / TRANSIT PROHIBITED**\n` +
            `• **Location:** Km 14+200 near Chite Veng, Aizawl District.\n` +
            `• **Threat Level:** RED ALERT (Index 94/100). High pore pressure (148 kPa) and continuing creep (38 mm displacement).\n` +
            `• **Alternative Route:** Light emergency vehicles diverted via **Armed Veng Bypass**.\n` +
            `• **Clearing Status:** 2x BRO CAT excavators staged. Clearing operations paused until slope pore pressure drops below 90 kPa safety threshold.\n\n` +
            `*Please do NOT attempt to cross NH-54 on foot or by car until clearance is officially notified.*`;
        } else if (lower.includes("crack") || lower.includes("sign") || lower.includes("symptom") || lower.includes("what to look")) {
          fallbackResponse = `**Critical Landslide Warning Signs to Watch For:**\n\n` +
            `1. **Tension Cracks:** New or widening fissures in the ground, roads, or foundation floors.\n` +
            `2. **Structural Tilting:** Utility poles, trees, or retaining walls leaning downhill.\n` +
            `3. **Water Color Surges:** Spring or stream water suddenly turning murky, chocolate-brown, or sudden cessation of water flow (signifies upstream damming).\n` +
            `4. **Acoustic Warning:** Low rumbling sound resembling a freight train or tumbling boulders.\n\n` +
            `*If you observe any of these, immediately evacuate uphill/perpendicular to the slope and report it in the "Field Reports" tab or call **1077**.*`;
        } else {
          fallbackResponse = `**NER-SHIELD Apna Mitr Emergency Guidance:**\n\n` +
            `Welcome. I am your 24x7 NDMA Disaster AI Assistant for the North Eastern Region.\n\n` +
            `• **Immediate Danger:** If you are near an active slope failure or tension crack, move to stable high ground perpendicular to the slide path. Dial **112** or **1077** immediately.\n` +
            `• **Current High Risk Sectors:** NH-54 Corridor (Aizawl, Red Alert) and East Jaintia Hills (Orange Alert).\n` +
            `• **Relief Centers:** Safe shelters are open at Ramhlun North Stadium and Chite Veng Hall.\n\n` +
            `Ask me anything about evacuation routes, shelters, road statuses, warning signs, or first aid!`;
        }

        return res.json({
          reply: fallbackResponse,
          source: "NER-SHIELD Statutory Disaster Knowledge Engine",
        });
      }

      // Build context-rich prompt for Gemini
      const dynamicContext = userLocation
        ? `User reported location: ${JSON.stringify(userLocation)}\n`
        : "";
      const extraContext = emergencyContext
        ? `Current App Telemetry Context: ${JSON.stringify(emergencyContext)}\n`
        : "";

      // Format previous conversation if any
      const conversationHistory = history
        .slice(-6)
        .map((h: { role: string; content: string }) => `${h.role === "user" ? "Citizen" : "Apna Mitr"}: ${h.content}`)
        .join("\n");

      const prompt = `
${dynamicContext}
${extraContext}
${conversationHistory ? `Recent Conversation:\n${conversationHistory}\n` : ""}
Citizen Query: "${message}"

Respond directly, empathetically, and concisely with actionable disaster safety instructions, exact helpline numbers, or shelter details as relevant:
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: DISASTER_KNOWLEDGE_BASE,
          temperature: 0.2, // Low temperature for high precision and statutory safety accuracy
        },
      });

      const replyText = response.text || "No response received. Please contact emergency helpline 112.";

      return res.json({
        reply: replyText,
        source: "Gemini 3.8 Flash (NER-SHIELD AI Intelligence)",
      });
    } catch (err: any) {
      console.error("AI Agent error:", err);
      return res.status(500).json({
        error: "Failed to generate AI response",
        fallback: "Dial 112 (National Emergency) or 1077 (District Control Room) for immediate life safety assistance.",
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NER-SHIELD Portal Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
