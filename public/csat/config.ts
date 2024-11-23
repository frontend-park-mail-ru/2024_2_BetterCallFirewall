import { AppConfig } from './app';

export const PAGE_LINKS = {
	question: '/csat/question',
	metrics: '/csat/metrics',
};

interface Question {
    name: string;
  }

const questionNames: Question[] = [
    {
        name: 'Насколько вы готовы рекомендовать Vilka друзьям и знакомым?'
    },
    {
        name: 'Оцените общение в сервисе'
    },
    {
        name: 'Оцените дизайн сервиса'
    },
]

const config: AppConfig = {
	URL: {},
	questionConfig: {
		question: {
			id: 1,
			key: 'question',
			name: 'Насколько вы готовы рекомендовать  Vilka друзьям и знакомым?',
			scoresConfig: Array.from({ length: 5 }, (_, i) => ({
				key: (i + 1).toString(),
				id: i + 1,
				color: `score-${i + 1}`,
			})),
		},
	},
	metricsConfig: {
		metrics: {
			key: 'metrics',
			id: 1,
			metricsConfig: [
				{
					key: 'score',
					id: 1,
					name: 'Насколько вы готовы рекомендовать  Vilka друзьям и знакомым?',
					average: 4,
				},
			],
		},
	},
};

export default config;
