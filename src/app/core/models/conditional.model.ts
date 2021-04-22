export interface Conditional {
    isActive: boolean;
    text: string;
    numberInput?: boolean;
    currentValue?: number;
    maxValue?: number;
}