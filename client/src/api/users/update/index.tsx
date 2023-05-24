import axios from "axios";
import React, { SetStateAction } from "react";
import { IUser } from "../../../contexts/AuthContext/types";

export interface IUpdateData {
	id: string;
	password: string;
	newPassword?: string;
	name?: string;
	username?: string;
	email?: string;
	profileIcon?: string;
	favoritesMovies?: {
		title: string;
		name: string;
		poster_path: string;
		id: string;
		vote_Average: string;
	}[];
}

export type HandleUpdateUserProps = {
	updateData: IUpdateData;
	setUser: React.Dispatch<SetStateAction<IUser | null>>;
};

export const handleUpdateUser = async ({
	updateData,
	setUser,
}: HandleUpdateUserProps) => {
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_APP_API_URL}/users/${updateData.id}`,
			updateData
		);

		const updatedUser = await response.data;

		setUser({ ...updatedUser, id: updatedUser._id });
	} catch (error) {
		console.log(error);
		alert("Algo deu errado.");
	}
};
