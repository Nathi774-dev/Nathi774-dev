def build_analysis_prompt(
    user_prompt: str,
    transport_context: dict
) -> str:

    return f"""
        Current transportation system information:

        {transport_context}

        Operator request:

        {user_prompt}

        Analyze the transportation information above.

        Provide:

        1. Current situation
        2. Important issues
        3. Possible risks
        4. Recommended actions

        Remember that the recommendations are advisory.
        Human operators make the final decisions.
    """