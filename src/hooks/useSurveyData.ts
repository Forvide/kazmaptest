import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface DataPoint {
    count: number;
    percentStr: string;
    percentFloat: number;
}

export interface Answer {
    text: string;
    regions: Record<string, DataPoint>;
}

export interface Question {
    id: string;
    text: string;
    answers: Answer[];
}

export function useSurveyData() {
    const [data, setData] = useState<Question[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch and parse the CSV from the public folder
        fetch('/survey.csv')
            .then(res => res.text())
            .then(csv => {
                Papa.parse(csv, {
                    skipEmptyLines: true,
                    complete: (results) => {
                        const rows = results.data as string[][];
                        if (rows.length < 2) return;

                        // Parse Regions (Row 0)
                        const headerRow = rows[0];
                        const regionMap: { index: number, name: string }[] = [];
                        const discoveredRegions: string[] = [];
                        for (let i = 2; i < headerRow.length; i += 2) {
                            if (headerRow[i]) {
                                regionMap.push({ index: i, name: headerRow[i] });
                                discoveredRegions.push(headerRow[i]);
                            }
                        }

                        setRegions(discoveredRegions);

                        // Parse Questions
                        const questions: Question[] = [];
                        let currentQuestion: Question | null = null;

                        for (let i = 1; i < rows.length; i++) {
                            const row = rows[i];
                            if (row.length < 2) continue;

                            const qText = row[0]?.trim();
                            const aText = row[1]?.trim();

                            if (!qText && !aText) continue;

                            // Sometimes there are repeated headers like КАЗАХСТАН, г. Астана
                            if (aText === '' && row[2] === 'КАЗАХСТАН') continue;

                            if (qText) {
                                // Important: Only add if there is actual text
                                currentQuestion = {
                                    id: qText,
                                    text: qText,
                                    answers: []
                                };
                                questions.push(currentQuestion);
                            }

                            if (currentQuestion && aText && aText !== 'КАЗАХСТАН') {
                                const answer: Answer = {
                                    text: aText,
                                    regions: {}
                                };

                                regionMap.forEach(r => {
                                    const countStr = row[r.index];
                                    const percentStr = row[r.index + 1];

                                    let percentFloat = 0;
                                    if (percentStr) {
                                        const cleanStr = percentStr.replace('%', '').replace(',', '.').trim();
                                        percentFloat = parseFloat(cleanStr) || 0;
                                    }

                                    answer.regions[r.name] = {
                                        count: parseInt(countStr) || 0,
                                        percentStr: percentStr || '0%',
                                        percentFloat
                                    };
                                });

                                currentQuestion.answers.push(answer);
                            }
                        }

                        // Keep only valid parsed questions that contain answers
                        setData(questions.filter(q => q.answers.length > 0));
                        setLoading(false);
                    }
                });
            })
            .catch(err => {
                console.error("Не удалось загрузить данные опроса:", err);
                setLoading(false);
            });
    }, []);

    return { data, regions, loading };
}
