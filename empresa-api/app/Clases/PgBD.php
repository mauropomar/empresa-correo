<?php
namespace App\Clases;

class PgBDLog
{
    protected $columns;
    protected $filename;
    protected $dir;
    protected $separator = " -- ";

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    function __construct($dir = 'logs', $filename = 'logs.log')
    {
        if (!is_dir('logs/pgbd_logs')) {
            mkdir('logs');
            mkdir('logs/pgbd_logs');
        }
        $this->filename = $filename;
        $this->dir = $dir;
    }

    /**
     *
     */
    public function filename($file = null)
    {
        if (!$file) return $this->filename;
        else  $this->filename = $file;
    }

    /**
     *
     */
    public function dir($dir = null)
    {
        if (!$dir) return $this->dir;
        else  $this->dir = $dir;
    }

    /**
     *
     */
    public function file_dir()
    {
        return $this->dir . $this->filename;
    }

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function write($values, $mode = 'a')
    {
        $file_dir = $this->dir . $this->filename;
        if (file_exists($file_dir) && filesize($file_dir) > 1048576) {
            $new_name = $this->dir . date('d-m-Y_H-i-s_') . $this->filename;
            rename($file_dir, $new_name);
        }
        $file = fopen($file_dir, $mode);
        if (!is_array($values))
            fwrite($file, (string)$values . PHP_EOL);
        else if (!is_array($values[0])) {
            $line = '';
            for ($i = 0; $i < count($values); $i++) {
                $line .= $this->separator . (string)$values[$i];
            }
            $line = substr($line, strlen($this->separator));
            fwrite($file, (string)$line . PHP_EOL);
        } else {
            $lines = '';
            for ($j = 0; $j < count($values); $j++) {
                $v = $values[$j];
                $line = '';
                for ($i = 0; $i < count($v); $i++) {
                    $line .= $this->separator . (string)$v[$i];
                }
                $line = substr($line, strlen($this->separator));
                $lines .= $line . PHP_EOL;
            }
            fwrite($file, (string)$lines);
        }
        fclose($file);
    }

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function setSeparator($separator)
    {
        $this->separator = $separator;
    }

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function separator()
    {
        return $this->separator;
    }

}
class PgBD
{
    protected $host;
    protected $user;
    protected $db;
    protected $port;
    protected $password;
    protected $cx;
    protected $last_query = '';
    public $return_mode = 0; // 0 = array index by text or single value, 1 = result resource, 2 = array alway , 3 array index by number
    public $affected_rows = 0;
    protected $in_transaction = false;
    public $log = false;
    public $logger = null;
    public $lastError = '';

    function __construct($host, $port, $db, $user, $password)
    {
        $this->host = $host;
        $this->user = $user;
        $this->db = $db;
        $this->port = $port;
        $this->password = $password;
        $this->cx = null;
        $this->logger = new PgBDLog('logs/pgbd_logs/', 'pgdb_log.log');
    }

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function connect()
    {
        $this->cx = pg_connect("host=$this->host port=$this->port dbname=$this->db user=$this->user password=$this->password", PGSQL_CONNECT_FORCE_NEW) or die("Could not connect");
       // $this->cx = pg_connect("host=$this->host port=$this->port dbname=$this->db user=$this->user password=$this->password") or die("Could not connect");
    }
    /**
     *
     */
    public function cx(){
        return $this->cx;
    }
    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function disconnect()
    {
        pg_close($this->cx);
        $this->cx = null;
    }

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function isConnected()
    {
        return ($this->cx) ? true : false;
    }

    /**
     * @param $values
     * @param string $mode
     */
    public function writeLog($values, $mode = 'a')
    {
        if ($this->log) {
            $this->logger->write($values, $mode);
        }
    }
    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function query($query, $params = null, $limit = false, $start = false, $end_slug = false)
    {
        $this->lastError = '';
        if (!$this->isConnected())
            throw new \Exception("Connection is closed. You most to call PgBD->connect()");
        $query_start = substr($query, 0, 10);
        $sql = false;
        if (strpos(strtolower($query_start), 'insert') === 0 || strpos(strtolower($query_start), 'select') === 0
            || strpos(strtolower($query_start), 'update') === 0 || strpos(strtolower($query_start), 'delete') === 0
            || strpos(strtolower($query_start), 'alter') === 0 || strpos(strtolower($query_start), 'create') === 0
            || strpos(strtolower($query_start), 'drop') === 0 || strpos(strtolower($query_start), 'begin') === 0
            || strpos(strtolower($query_start), 'commit') === 0 || strpos(strtolower($query_start), 'rollback') === 0
            || strpos(strtolower($query_start), 'set') === 0
            || strpos(strtolower($query_start), 'copy') === 0
        ) {
            $sql = true;
        } else {
            if ($params === null)
                $params = array();
            else if (!is_array($params))
                $params = array($params);
            $params_str = '';
            if ($params && count($params) > 0)
                for ($i = 0; $i < count($params); $i++) {
                    $params_str .= ',' . '$' . ($i + 1);
                }
            $params_str = substr($params_str, 1);
            $query = 'select * from public."' . $query . '"(' . $params_str . ')';

        }
        $limit_str = '';
        $start_str = '';
        $end_slug_str = '';
        if ($limit)
            $limit_str = ' limit ' . $limit;
        if ($start)
            $start_str = ' offset ' . $start;
        if ($end_slug)
            $end_slug_str = ' ' . $end_slug;
        $query = $query . $end_slug_str . $limit_str . $start_str;
        $this->last_query = $query;
        if (is_array($params) && count($params) > 0) {
            $result = pg_query_params($this->cx, $query, $params);
        } else {
            $result = pg_query($this->cx, $query);
        }
        $error = pg_last_error($this->cx);
        $this->writeLog(array(date('Y-m-d H:i:s'), $query));
        if ($error != '') {
            $this->lastError = $error;
            $this->writeLog(array(date('Y-m-d H:i:s', $error)));
            throw new \Exception("Postgres error: '" . $error . "' in query '" . $query . "' width parameters (" . implode(',', $params) . ")");
        }
        $this->affected_rows = pg_affected_rows($result);
        if ($result && $this->return_mode == 0) {
            $rows = pg_fetch_all($result);
            if (!$rows)
                return false;
            $keys = array_keys($rows[0]);
            if (count($rows) == 1 && count($keys) == 1)
                return $rows[0][$keys[0]];
            else
                return $rows;
        } else if ($result && $this->return_mode == 1) {
            return $result;
        } else if ($result && $this->return_mode == 3) {
            $r_array = array();
            for ($i = 0; $i < pg_num_rows($result); $i++) {
                $row = pg_fetch_array($result,null,PGSQL_NUM);
                array_push($r_array, $row);
            }
            return $r_array;
        }
    }

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function count($table, $field = '*')
    {
        return $this->query('select count(' . $table . '.' . $field . ') from ' . $table);
    }

    /*
Function: Function name here
Description here
Parameters:
type $par - Description here
*/
    public function max($table, $field)
    {
        return $this->query('select max(' . $table . '.' . $field . ') from ' . $table);
    }

    /*
    Function: Function name here
    Description here
    Parameters:
    type $par - Description here
    */
    public function lastQuery()
    {
        return $this->last_query;
    }

    /**
     *
     */
    public function createTable($table_name, $schema = 'public', $fields = array())
    {
        if (count($fields) == 0)
            $this->query('CREATE TABLE ' . $schema . '."' . $table_name . '" ()');
    }

    /**
     *
     */
    public function createField($table_name, $schema, $field_name, $field_type)
    {
        $this->query('ALTER TABLE ' . $schema . '."' . $table_name . '" ADD COLUMN "' . $field_name . '" ' . $field_type . ';');
    }

    /**
     *
     */
    public function copyFrom($table_name, $rows, $delimiter = ';')
    {
        pg_query($this->cx, "COPY $table_name FROM STDIN DELIMITERS E'$delimiter' NULL E'NULL';");
        foreach ($rows as $r) {
            $line = implode('~', $r) . "\n";
            // $line = str_replace($delimiter.$delimiter,$delimiter.'\\N'.$delimiter,$line);
            pg_put_line($this->cx, $line);
        }
        pg_put_line($this->cx, "\\.\n");
        pg_end_copy($this->cx);
        $error_msg = pg_errormessage($this->cx);
        if ($error_msg) {
            throw new \Exception('copyFrom: ' . $error_msg);
        }
    }

    /**
     *
     */
    public function dropTable($table_name, $schema = 'public')
    {
        $this->query('DROP TABLE IF EXISTS ' . $schema . '."' . $table_name . '"');
    }

    /**
     *
     */
    public function updateRecord($table, $id_field, $fields)
    {
        $sql = 'UPDATE ' . $table;
        $set = ' set ';
        $values = array();
        $i = 1;
        foreach ($fields as $key => $value) {
            if ($key != $id_field) {
                $values[] = $value;
                $set .= ' ' . $key . " = $" . $i . ",";
                $i++;
            }
        }
        $values[] = $fields[$id_field];
        $set = substr($set, 0, strlen($set) - 1);
        $where = ' WHERE ' . $id_field . " = $" . count($values);
        $sql .= $set . $where;
        $this->query($sql, $values);
    }

    /**
     *
     */
    public function addRecord($table, $fields)
    {
        $sql = 'INSERT INTO ' . $table;
        $cols = '(';
        $values = array();
        $values_params = 'VALUES(';
        $i = 1;
        foreach ($fields as $key => $value) {
            $values[] = $value;
            $cols .= $key . ",";
            $values_params .= "$" . $i . ",";
            $i++;
        }
        $cols = substr($cols, 0, strlen($cols) - 1) . ')';
        $values_params = substr($values_params, 0, strlen($values_params) - 1) . ')';
        $sql .= $cols . $values_params;
        $this->query($sql, $values);
    }

    /**
     *
     */
    public function getUniqueId()
    {
        return md5(uniqid(mt_rand(), true));
    }

    /**
     *
     */
    public function beginTransaction()
    {

        if (!$this->in_transaction) {
            $this->query("BEGIN");
            $this->query("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED");
        }
        $this->in_transaction = true;
    }

    /**
     *
     */
    public function commit()
    {
        $this->query("COMMIT");
        $this->in_transaction = false;
    }

    /**
     *
     */
    public function rollBack()
    {
        $this->query("ROLLBACK");
        $this->in_transaction = false;
    }
}
