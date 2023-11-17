import React, { useEffect } from "react";
import {ChipProps, Select, SelectItem, Selection} from "@nextui-org/react";
import {transactionType} from "@/data/selection";

interface TransactionTypeSelectProps {
  onTransactionSelect: (transactionType: string) => void;
}

export default function TransactionTypeSelect({ onTransactionSelect }: TransactionTypeSelectProps) {
  const [value, setValue] = React.useState<Selection>(new Set([]));
  const handleSelectionChange = (selectedValues: Selection) => {
    setValue(selectedValues);
  };
  
  const selectedValues = Array.from(value);

  useEffect(() => {
    if (onTransactionSelect) {
      onTransactionSelect(transactionType[0].value);
    }
  }, [onTransactionSelect]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
        <div className="flex flex-row">
          <Select
            label="What type of transaction is this?"
            variant="bordered"
            selectedKeys={value}
            className="max-w-xs"
            onSelectionChange={handleSelectionChange}
            isRequired
            description="Set to 'deposit' by default."
        >
            {transactionType.map((type) => (
            <SelectItem key={type.value} value={type.value}>
                {type.label}
            </SelectItem>
            ))}
          </Select>
        </div>
    </div>
  );
}
