import React from 'react';

type TextareaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  maxLength?:number;
  length?:number;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  length,
  maxLength,
  placeholder = '',
  rows = 5,
  cols = 33,
  disabled = false,
  style,
  className,
}) => {
  return (
    <div>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      disabled={disabled}
      style={style}
      className={className}
    />
    <p className='text-[#4D5562] flex w-full justify-end text-sm font-semibold mb-3'>{length}/{maxLength}</p>
    </div>
  );
};

export default Textarea;