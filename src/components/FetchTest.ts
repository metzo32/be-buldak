export async function fetchIngredients() {
  try {
    const response = await fetch("http://localhost:8080/api/ingredients");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("재료 데이터 가져오기 실패:", error);
    return null;
  }
}
