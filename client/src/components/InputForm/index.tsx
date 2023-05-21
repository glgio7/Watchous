import React from "react";
import * as S from "./styles";

type InputProps = {
	label: string;
	id: string;
	type: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required: boolean;
	readonly?: boolean;
	children?: React.ReactNode;
};

const InputContainer = ({
	label,
	id,
	type,
	value,
	onChange,
	required,
	readonly,
	children,
}: InputProps) => {
	return (
		<S.InputContainer>
			<label htmlFor={id}>
				{children}
				{label}
			</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				required={required}
				readOnly={readonly}
			/>
		</S.InputContainer>
	);
};

export default InputContainer;
