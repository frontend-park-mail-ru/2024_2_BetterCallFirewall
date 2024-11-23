import { AppConfig } from "./app";

export const PAGE_LINKS = {
	question: '/csat/question',
	metrics: '/csat/metrics',
};

const config: AppConfig = {
    URL: {},
    questionConfig: {
        question: {
            key: 'question',
            name: 'Насколько вы готовы рекомендовать  Vilka друзьям и знакомым?',
            scoresConfig: [
                {
                    key: '1',
                    id: 1,
                    color: '3',
                },
                {
                    key: '2',
                    id: 2,
                    color: '4',
                },
            ],
        }
    },
};

export default config;
