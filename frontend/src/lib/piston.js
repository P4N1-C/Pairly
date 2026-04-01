const BACKEND_URL = import.meta.env.VITE_API_URL;

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
    const response = await fetch(`${BACKEND_URL}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compiler: languageConfig.compiler,
        code: code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP error! status: ${response.status}`,
      };
    }
    return {
      success: true,
      output: data.output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to connect to backend: ${error.message}`,
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
