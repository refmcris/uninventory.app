// uploadImage.js
import axios from "axios";

export const UploadImage = async (
  file,
  setLoading,
  setImageBase64,
  setImageUploaded
) => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (file && file.size > MAX_SIZE) {
    alert("El archivo es demasiado grande. El límite es de 5MB.");
    return;
  }
  if (file && !allowedTypes.includes(file.type)) {
    alert("Por favor, sube un archivo de imagen (JPG, PNG, GIF).");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Uninventorys");

  setLoading(true);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/ds6fxjeak/image/upload`,
      formData
    );
    const imageUrl = response.data.secure_url;
    setImageBase64(imageUrl);
    setImageUploaded(true);
  } catch (error) {
    console.error("Error al subir la imagen a Cloudinary:", error);
  } finally {
    setLoading(false);
  }
};
