<template>
  <div class="section">
    <NuxtLink href="#smart-contracts">
      <h2>Smart Contracts</h2>
    </NuxtLink>
    <div class="section-child">
      <h3>1. QulotLottery</h3>
      <div class="section-child">
        <!-- Lottery Status states -->
        <h3>1.1. Lottery Status states</h3>
        <div class="section-child">
          <p>
            The lottery has four Status states, Pending, Open, Close, and
            Claimable, that determine which actions can and cannot be taken at a
            given time.
          </p>
        </div>

        <!-- Read/View functions -->
        <h3>1.2. Read/View functions</h3>
        <div class="section-child">
          <!-- getLotteryIds -->
          <h3>1.2.1. getLotteryIds</h3>
          <div class="section-child">
            <p>Return a list of lottery ids</p>
            <CodeBlock class="mb-2 w-full">
              function getLotteryIds() external view returns (string[] memory
              lotteryIds);
            </CodeBlock>
          </div>

          <!-- getLottery -->
          <h3>1.2.2. getLottery</h3>
          <div class="section-child">
            <CodeBlock class="mb-2 w-full">
              function getLottery(string calldata _lotteryId) external view
              returns (Lottery memory lottery);
            </CodeBlock>
            <p>
              Returns information on specified Lottery as tuple by lottery id
              (see Lottery structure below).
            </p>
            <CodeBlock class="mb-2 w-full">
              string verboseName;
              <br />
              string picture;
              <br />
              uint32 numberOfItems;
              <br />
              uint32 minValuePerItem;
              <br />
              uint32 maxValuePerItem; // day of the week (0 - 6)
              (Sunday-to-Saturday)
              <br />
              uint[] periodDays; // hour (0 - 23)
              <br />
              uint periodHourOfDays;
              <br />
              uint32 maxNumberTicketsPerBuy;
              <br />
              uint256 pricePerTicket;
              <br />uint32 treasuryFeePercent; <br />
              uint32 amountInjectNextRoundPercent; <br />uint32 discountPercent;
            </CodeBlock>
          </div>

          <!-- getRoundIds -->
          <h3>1.2.3. getRoundIds</h3>
          <div class="section-child">
            <p>Return a list of round ids</p>
            <CodeBlock class="mb-2 w-full">
              function getRoundIds() external view returns (uint256[] memory
              roundIds);
            </CodeBlock>
          </div>

          <!-- getRound -->
          <h3>1.2.4. getRound</h3>
          <div class="section-child">
            <CodeBlock class="mb-2 w-full">
              function getRound(uint256 _roundId) external view returns (Round
              memory round);
            </CodeBlock>
            <p>
              Returns information on specified Round as tuple by round id (see
              Round structure below).
            </p>
            <CodeBlock class="mb-2 w-full">
              uint32[] winningNumbers;
              <br />
              uint256 endTime;
              <br />
              uint256 openTime;
              <br />
              uint256 totalAmount;
              <br />
              uint256 totalTickets;
              <br />
              uint256 firstRoundId;
              <br />
              RoundStatus status;
            </CodeBlock>
          </div>

          <!-- getTicketIdsByUserLength -->
          <h3>1.2.5. getTicketIdsByUserLength</h3>
          <div class="section-child">
            <p>Return a length of ticket ids by user address.</p>
            <CodeBlock class="mb-2 w-full">
              function getTicketIdsByUserLength(address _user) external view
              returns (uint256);
            </CodeBlock>
          </div>

          <!-- getTicketIdsByUser -->
          <h3>1.2.6. getTicketIdsByUser</h3>
          <div class="section-child">
            <p>Returns ticketIds of a user for all rounds.</p>
            <CodeBlock class="mb-2 w-full">
              function getTicketIdsByUser(
              <br />
              address _user,
              <br />
              uint256 _cursor,
              <br />
              uint256 _size,
              <br />
              bool _asc
              <br />
              ) external view returns (uint256[] memory ticketIds, uint256
              cursor);
            </CodeBlock>
          </div>

          <!-- getTicket -->
          <h3>1.2.7. getTicket</h3>
          <div class="section-child">
            <CodeBlock class="mb-2 w-full">
              function getTicket(uint256 _ticketId) external view returns
              (Ticket memory ticket);
            </CodeBlock>
            <p>
              Returns information on specified Ticket as tuple by ticket id (see
              Ticket structure below).
            </p>
            <CodeBlock class="mb-2 w-full">
              uint32[] numbers;
              <br />
              address owner;
              <br />
              uint256 roundId;
              <br />
              bool winStatus;
              <br />
              uint winRewardRule;
              <br />
              uint256 winAmount;
              <br />
              bool clamStatus;
            </CodeBlock>
          </div>
        </div>

        <!-- Write functions (users) -->
        <h3>1.3. Write functions (users)</h3>
        <div class="section-child">
          <!-- buyTickets -->
          <h3>1.3.1. buyTickets</h3>
          <div class="section-child">
            <CodeBlock class="mb-2 w-full">
              function buyTickets(uint256 _roundId, uint32[][] calldata
              _tickets) external override notContract nonReentrant;
            </CodeBlock>
            <p>
              Buy tickets for the current Open Lottery round (between 1 and 100
              per purchase).
            </p>
          </div>

          <!-- buyTicketsMultiRounds -->
          <h3>1.3.2. buyTicketsMultiRounds</h3>
          <div class="section-child">
            <CodeBlock class="mb-2 w-full">
              function buyTicketsMultiRounds(
              <br />
              uint256[] calldata _roundIds,
              <br />
              uint32[][] calldata _tickets
              <br />
              ) external override notContract nonReentrant
            </CodeBlock>
            <p>
              Buy tickets for the multi Open Lottery round (between 1 and 100
              per purchase).
            </p>
          </div>

          <!-- claimTickets -->
          <h3>1.3.3. claimTickets</h3>
          <div class="section-child">
            <p>
              Claim a set of winning tickets for a Claimable Lottery round.
              Checks round of ticket to determine if round is claimable,
              ownership of ticketId.
            </p>
            <CodeBlock class="mb-2 w-full">
              function claimTickets(uint256[] calldata _ticketIds) external
              override notContract nonReentrant;
            </CodeBlock>
          </div>
        </div>

        <!-- Write functions (operator/admin) -->
        <h3>1.4. Write functions (operator/admin)</h3>
        <div class="section-child">
          <!-- close -->
          <h3>1.4.1. close</h3>
          <div class="section-child">
            <p>
              Close current round for lottery. Block any more tickets from being
              purchased for the current round.
            </p>
            <CodeBlock class="mb-2 w-full">
              function close(string calldata _lotteryId) external override
              onlyOperatorOrTrigger;
            </CodeBlock>
          </div>

          <!-- draw -->
          <h3>1.4.2. draw</h3>
          <div class="section-child">
            <p>
              After closed need to draw current round for lottery. Request
              random generator to get lucky numbers.
            </p>
            <CodeBlock class="mb-2 w-full">
              function draw(string calldata _lotteryId) external override
              onlyOperatorOrTrigger;
            </CodeBlock>
          </div>

          <!-- reward -->
          <h3>1.4.3. reward</h3>
          <div class="section-child">
            <p>
              After drew need to reward current round for lottery. Find the
              winners and calculate the prize distribution for each winners.
            </p>
            <CodeBlock class="mb-2 w-full">
              function reward(string calldata _lotteryId) external override
              onlyOperatorOrTrigger;
            </CodeBlock>
          </div>

          <!-- open -->
          <h3>1.4.4. open</h3>
          <div class="section-child">
            <p>After rewarded need to open new round for lottery.</p>
            <CodeBlock class="mb-2 w-full">
              function open(string calldata _lotteryId) external override
              onlyOperatorOrTrigger;
            </CodeBlock>
          </div>

          <!-- injectFunds -->
          <h3>1.4.5. injectFunds</h3>
          <div class="section-child">
            <p>
              The Owner can call this function to inject a specific round id
              with a specified amount of {{ token?.symbol }}.
            </p>
            <CodeBlock class="mb-2 w-full">
              function injectFunds(uint256 _roundId, uint256 _amount) external
              onlyOwner;
            </CodeBlock>
          </div>

          <!-- recoverWrongTokens -->
          <h3>1.4.6. recoverWrongTokens</h3>
          <div class="section-child">
            <p>
              In the case of tokens other than {{ token?.symbol }} mistakenly
              being sent to the lottery contract, this function is used to
              recover them and is only callable by the Owner.
            </p>
            <CodeBlock class="mb-2 w-full">
              function recoverWrongTokens(address _tokenAddress, uint256
              _tokenAmount) external onlyOwner;
            </CodeBlock>
          </div>

          <!-- setRandomGenerator -->
          <h3>1.4.7. setRandomGenerator</h3>
          <div class="section-child">
            <p>
              For the Owner to update the RandomNumberGenerator contract in case
              we need to update the drawing logic, or release an update.
            </p>
            <CodeBlock class="mb-2 w-full">
              function setRandomGenerator(address _randomGeneratorAddress)
              external override onlyOwner;
            </CodeBlock>
          </div>

          <!-- setOperatorAddress -->
          <h3>1.4.8. setOperatorAddress</h3>
          <div class="section-child">
            <p>Function used to set the Operator address.</p>
            <CodeBlock class="mb-2 w-full">
              function setOperatorAddress(address _operatorAddress) external
              onlyOwner;
            </CodeBlock>
          </div>

          <!-- addLottery -->
          <h3>1.4.10. addLottery</h3>
          <div class="section-child">
            <p>Function used to set the Trigger address.</p>
            <CodeBlock class="mb-2 w-full">
              function addLottery(string memory _lotteryId, Lottery memory
              _lottery) external override onlyOperator;
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { token } = useQulot()
</script>
