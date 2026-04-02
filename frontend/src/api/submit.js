import axiosInstance from "../lib/axios";
import { LANGUAGE_VERSIONS } from "../lib/language";

export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];
    if (!languageConfig) {
      return { success: false, error: `Unsupported language: ${language}` };
    }
    const response = await axiosInstance.post("/run/run-code", {
      compiler: languageConfig.compiler,
      code: code,
    });
    return {
      success: true,
      output: response.data.output || "No output",
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Execution failed";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
