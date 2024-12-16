import Image from "next/image";
import styles from "./page.module.scss";
<<<<<<< Updated upstream
=======
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { updateUser } from "@/app/features/usersSlice";
import { ref, uploadBytes } from "@firebase/storage";
import { storage } from "./firebase";

const UserImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const user = useSelector((state: RootState) => state.users.activeUser);

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: any) => {
    console.log("Changing the file");
    setFile(() => event.target.files[0]);
  };

  useEffect(() => {
    const handleUpload = () => {
      console.log("Uploading the file");

      if (!file) return;

      const storageRef = ref(storage, `${file.name}`);

      if (user) {
        uploadBytes(storageRef, file)
          .then((snapshot) => {
            console.log("Uploaded a photo!", snapshot);
            dispatch(
              updateUser({
                id: user.id,
                newData: { photoURL: snapshot.metadata.fullPath },
              })
            );
          })
          .catch((error) => {
            console.error("Upload failed", error);
          });
      } else {
        console.error("No such user");
      }
    };
    handleUpload();
  }, [file, dispatch, user]);

  const handleDelete = async () => {
    if (user) {
      const res = await dispatch(
        updateUser({
          id: user?.id,
          newData: { photoURL: null },
        })
      );
      if (res) {
        // const userJSON = sessionStorage.getItem("user");
        // if (userJSON) {
        //   const user = JSON.parse(userJSON);
        //   sessionStorage.setItem(
        //     "user",
        //     JSON.stringify({ ...user, photoURL: null })
        //   );
        // }

        console.log("Photo has been deleted");
      } else {
        console.log("Photo wasn't deleted");
      }
    } else {
      console.error("No such user");
    }
  };
>>>>>>> Stashed changes

const UserImage = ({ user }: any) => {
  return (
    <div className={styles.profileImage}>
      {user?.photoURL && <Image src={user?.photoURL} alt="Profile" />}

      <div className={styles.newImageSetting}>
        <label className={styles.customFileUpload}>
          <input
            type="file"
            className={styles.image}
            // onChange={(e) => updatePhotoURL(e, "update")}
            accept="image/*"
          />
          <div>Загрузить {user?.photoURL && "новое"} изображение</div>
        </label>
      </div>

      {user?.photoURL && (
        <button
          onClick={() => {
            console.log("Изображение удалено");
          }}
          className="button"
        >
          Удалить текущее изображение
        </button>
      )}
    </div>
  );
};

export default UserImage;
