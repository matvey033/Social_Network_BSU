import { useContext, useEffect, useRef, useState } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notification, setNotification] = useState(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => makeRequest.get("/stories").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (newStory) => makeRequest.post("/stories", newStory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const uploadFile = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Ошибка загрузки файла", err);
      showNotification("Ошибка загрузки файла");
      return null;
    }
  };

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setIsUploading(true);

    const img = await uploadFile(selectedFile);
    if (!img) {
      setIsUploading(false);
      setFile(null);
      setPreviewUrl(null);
      fileRef.current.value = "";
      return;
    }

    mutation.mutate(
      { img },
      {
        onSuccess: () => {
          setFile(null);
          setPreviewUrl(null);
          setIsUploading(false);
          fileRef.current.value = "";
          showNotification("История добавлена");
        },
        onError: () => {
          showNotification("Не удалось загрузить изображение.");
          setIsUploading(false);
        },
      }
    );
  };


  const deleteMutation = useMutation({
    mutationFn: (storyId) => makeRequest.delete(`/stories/${storyId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="stories">
      {notification && <div className="notification">{notification}</div>}
      <div className="story">
        {currentUser ? (
          <>
            <img
              src={
                currentUser.profilePic
                  ? "/upload/" + currentUser.profilePic
                  : "https://cdn-icons-png.flaticon.com/512/149/149452.png"
              }
              alt=""
            />
            <span>{currentUser.name}</span>
            <button onClick={() => fileRef.current.click()}>+</button>
            <input
              type="file"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const selected = e.target.files[0];
                if (selected) {
                  const url = URL.createObjectURL(selected);
                  setPreviewUrl(url);
                  handleFileSelect(selected);
                }
              }}
              accept="image/*"
            />
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>

      {file && (
        <div className="story preview">
          <img src={previewUrl} alt="preview" />
        </div>
      )}

      {error ? (
        <span>Ошибка загрузки историй</span>
      ) : isPending ? (
        <span>Загрузка...</span>
      ) : (
        data.map((story) => (
          <div className="story" key={story.id}>
            <img src={"/upload/" + story.img} alt="" />
            <span title={story.name}>
              {story.name.length > 10 ? story.name.slice(0, 10) + "..." : story.name}
              {story.userId === currentUser.id && (
                <button onClick={() => deleteMutation.mutate(story.id)}>X</button>
              )}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Stories;