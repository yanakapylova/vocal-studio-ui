import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "./interfaces/Group";
import { User } from "./interfaces/User";
import { Schedule } from "./interfaces/Schedule";

// get all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://127.0.0.1:3008/api/users", {
    method: "GET",
  });

  if (!response.ok) {
    console.log("Не удалось получить пользователей");
    return null;
  }

  return response.json();
});

// get user by id
export const fetchUserbyId = createAsyncThunk(
  "user/fetchUserbyId",
  async (id: number) => {
    const response = await fetch(`http://localhost:3008/users/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Wrong user id");
      return null;
    }

    const data = await response.json();
    return data;
  }
);

// create user
export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: {
    name: string;
    surname: string;
    birthdate: string;
    email: string;
    role: string;
    groups: number[];
  }) => {
    const { name, surname, birthdate, email, role, groups } = user;
    console.log(user);
    console.log(new Date(birthdate));
    const response = await fetch(`http://127.0.0.1:3008/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        fathername: "cvbhnjmk",
        birthdate: new Date(birthdate),
        email: email,
        password: birthdate.toString(),
        role: role,
        groups: groups,
      }),
    });

    if (!response.ok) {
      console.error("Error creating a user");
      console.log(response);
      return null;
    }

    console.log(`Пользователь ${name} ${surname} успешно создан`);
    const data = await response.json();
    return data;
  }
);

// delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: number) => {
    const response = await fetch(`http://127.0.0.1:3008/api/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Error deleting user");
      return null;
    }
    console.log(`Пользователь успешно удален`);
    return id;
  }
);

// обновление user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: {
    id: number;
    newData: {
      name?: string;
      surname?: string;
      birthdate?: string;
      email?: string;
      role?: string;
      photoURL?: string | null;
      groups?: Group[];
    };
  }) => {
    const { id, newData } = data;
    const jwt: string | null = localStorage.getItem("jwtToken");

    if (jwt) {
      const response = await fetch(`http://127.0.0.1:3008/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt.toString(),
        },

        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        console.log(`Не удалось обновить информация о пользователе`);
        return null;
      } else {
        console.log(`Инофрмация о пользователе успешно обновлена`);
        return { id: data.id, ...data.newData };
      }
    } else {
      console.log(`Требуется авторизация`);
      return null;
    }
  }
);

// вход в аккаунт
export const signIn = createAsyncThunk(
  "user/signIn",
  async (credits: { email: string; password: string }) => {
    const { email, password } = credits;
    const response = await fetch(`http://127.0.0.1:3008/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      return { id: null, statusCode: +response.status };
    }

    const data = await response.json();
    localStorage.removeItem("jwtToken");
    localStorage.setItem("jwtToken", "Bearer " + data["access_token"]);

    return data["user"];
  }
);

// инф-ия об активном пользователе
export const setActiveUser = createAsyncThunk(
  "user/setActiveUser",
  async () => {
    const user = sessionStorage.getItem("user");
    if (user) return await JSON.parse(user);
  }
);

export interface ActiveUser {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  email: string;
  role: string;
  groups: Group[];
  photoURL: string | null;
}

export interface UsersState {
  entities: User[];
  activeUser: ActiveUser | null;
  actionStatus: any;
  activeSchedule: Schedule[];
  groups: Group[];
}

const initialState: UsersState = {
  entities: [],
  activeUser: null,
  actionStatus: 0,
  activeSchedule: [],
  groups: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    // получить всех пользователей (только для админа)
    builder.addCase(fetchUsers.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.entities = data;
      }
    });

    builder.addCase(fetchUserbyId.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          email: data.email,
          role: data.role,
          groups: data.groups,
          photoURL: data.photoURL,
        };
      }
    });

    // создать нового пользователя
    builder.addCase(createUser.fulfilled, (state: any, action: any) => {
      const data = action.payload;

      if (data) {
        state.entities.push(data);
      }
    });

    // обновить пользователя
    builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
      const newData = action.payload;

      const oldData = sessionStorage.getItem("user");
      if (oldData) {
        const data = { ...JSON.parse(oldData), ...newData };

        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          email: data.email,
          role: data.role,
          photoURL: data.photoURL,
          groups: data.groups,
        };

        sessionStorage.setItem("user", JSON.stringify(data));
      }
    });

    // удалить пользователя
    builder.addCase(deleteUser.fulfilled, (state: any, action: any) => {
      const id = action.payload;

      if (id) {
        state.entities = state.entities.filter(
          (entity: any) => entity.id !== id
        );
      }
    });

    // вход в аккаунт
    builder.addCase(signIn.fulfilled, (state: any, action: any) => {
      const data = action.payload;

      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          email: data.email,
          role: data.role,
          photoURL: data.photoURL,
          groups: data.groups,
        };
      }

      sessionStorage.setItem("user", JSON.stringify(data));
    });

    // инф-ия об активном пользователе
    builder.addCase(setActiveUser.fulfilled, (state: any, action: any) => {
      const data = action.payload;

      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          email: data.email,
          role: data.role,
          photoURL: data.photoURL,
          groups: data.groups,
        };
      }
    });
  },
});

export const usersReducer = usersSlice.reducer;
