import React, { useEffect } from "react";
import {ChipProps, Select, SelectItem, Selection} from "@nextui-org/react";
import {transactionType} from "@/data/selection";

interface TransactionTypeSelectProps {
  onTransactionSelect: (transactionType: string) => void;
}

export default function TransactionTypeSelect({ onTransactionSelect }: TransactionTypeSelectProps) {
  const [value, setValue] = React.useState<string>("");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onTransactionSelect(e.target.value)
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
        <div className="flex flex-row">
          <Select
            label="What type of transaction is this?"
            variant="bordered"
            className="max-w-xs"
            onChange={handleSelectionChange}
            isRequired
            defaultSelectedKeys={["deposit"]}
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
