import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    if (!problem || !difficulty) {
      return res.status(400).json({
        message: "Problem and Difficulty are required",
      });
    }
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    // Chat Message
    const channel = chatClient.channel("messaging", callId, {
      name: `&{problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();
    res.status(201).json({
      session,
    });
  } catch (error) {
    console.error("error in createSession controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const session = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      session,
    });
  } catch (error) {
    console.error("error in getActiveSessions controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    // get sessions where user is host or participant
    const userId = req.user._id;
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({
      session: sessions,
    });
  } catch (error) {
    console.error("error in getMyRecentSessions controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage, clerkId")
      .populate("participant", "name email profileImage, clerkId");

    if (!session)
      return res.status(404).json({
        message: "Session not found",
      });
    res.status(200).json({
      session: session,
    });
  } catch (error) {
    console.error("error in getSessionById controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    const session = Session.findById(id);
    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.status !== "active") {
      return res.status(400).json({
        message: "Session is not active",
      });
    }

    if (session.host.toString() === userId.toString()) {
      return res.status(400).json({
        message: "Host cannot be a participant",
      });
    }

    if (session.participant) {
      return res.status(409).json({
        message: "Session Full!",
      });
    }

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);
    res.status(200).json({
      session: session,
    });
  } catch (error) {
    console.error("error in joinSession controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }
    // check if host
    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }

    // check if already completed
    if (session.status === "completed") {
      return res.status(403).json({
        message: "Session already ended",
      });
    }

    // delete the stream video call and messages
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    const chat = chatClient.channel("messaging", session.callId);
    await chat.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({
      session,
      message: "Session ended",
    });
  } catch (error) {
    console.error("error in endSession controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
