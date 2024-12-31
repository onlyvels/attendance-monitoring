<?php

namespace App\Logging;

use Monolog\Formatter\FormatterInterface;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\Logger;
use Monolog\LogRecord;

class AxiomHandler extends AbstractProcessingHandler
{
    private $apiToken;
    private $dataset;

    public function __construct($level = Logger::DEBUG, bool $bubble = true, $apiToken = null, $dataset = null)
    {
        parent::__construct($level, $bubble);
        $this->apiToken = $apiToken;
        $this->dataset = $dataset;
    }

    private function initializeCurl(): \CurlHandle
    {
        $endpoint = "https://api.axiom.co/v1/datasets/{$this->dataset}/ingest";
        $ch = curl_init($endpoint);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->apiToken,
            'Content-Type: application/json',
        ]);

        return $ch;
    }

    protected function write(LogRecord $record): void
    {
        $ch = $this->initializeCurl();

        $data = [
            'message' => $record->message,
            'context' => $record->context,
            'level' => $record->level->getName(),
            'channel' => $record->channel,
            'extra' => $record->extra,
        ];

        $payload = json_encode([$data]);

        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_exec($ch);
        if (curl_errno($ch)) {
            // Optionally log the curl error to PHP error log
            error_log('Curl error: ' . curl_error($ch));
        }

        curl_close($ch);
    }

    protected function getDefaultFormatter(): FormatterInterface
    {
        return new \Monolog\Formatter\JsonFormatter();
    }
}
