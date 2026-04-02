import axiosInstance from "./axios";
const LANGUAGE_VERSIONS = {
  cpp: {
    language: "cpp",
    version: "15.2.1",
    compiler: "g++-15",
  },
  python: { language: "python", version: "3.10.0", compiler: "python-3.14" },
  java: { language: "java", version: "15.0.2", compiler: "openjdk-25" },
};

/**
 * @param {string} language - language
 * @param {string} code - source code
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
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

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
