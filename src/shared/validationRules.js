export const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid',
];

export const rules = {
    required: value => !!value || "Required.",
    min: v => (v && v.length >= 8) || "Min 8 characters"
}

