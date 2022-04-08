import { ApiResponse } from '@nestjs/swagger';

export const ApiResponseWithExamples = (
  statusCode: number,
  examples: Array<{ title: string; value: any }>,
) =>
  ApiResponse({
    status: statusCode,
    content: {
      'application/json': {
        examples: {
          ...examples.reduce(
            (acc, { title, value }) => ({ ...acc, [title]: { value } }),
            {},
          ),
        },
      },
    },
  });
