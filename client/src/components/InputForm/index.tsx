import React, { FormEvent } from "react";
import * as S from "./styles";

type InputProps = {
	label: string;
	id: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required: boolean;
};

const InputContainer = ({
	label,
	id,
	type,
	value,
	onChange,
	required,
}: InputProps) => {
	return (
		<S.InputContainer>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				required={required}
			/>
		</S.InputContainer>
	);
};

export default InputContainer;
